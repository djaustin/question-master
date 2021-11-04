import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Container, Flex, Heading, Stack } from "@chakra-ui/layout";
import { Button, CloseButton, Image, Text, Textarea } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import { useToast } from "@chakra-ui/toast";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "../../components/FileUpload";
import { Navbar } from "../../components/Navbar";
import { requireLogin } from "../../integrations/authentication";
import prisma from "../../integrations/db";
import config from "../../config";

type ConfigInputs = {
  question: string;
  images: FileList;
  emailAddress: string;
  emailSubject: string;
  emailTemplate: string;
};

type ConfigProps = {
  question: string;
  brandingUrl: string;
  emailAddress: string;
  emailSubject: string;
  emailTemplate: string;
};

const Config: React.FC<ConfigProps> = ({ question, brandingUrl, emailAddress, emailSubject, emailTemplate }) => {
  const {
    handleSubmit,
    register,
    formState: { isDirty },
    watch,
    getValues,
    setValue,
  } = useForm<ConfigInputs>({
    defaultValues: { question, emailAddress, emailSubject, emailTemplate },
  });
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>(
    brandingUrl ?? ""
  );
  const toast = useToast();
  const submit = async (data: ConfigInputs) => {
    try {
      const image = data.images[0];
      let imageName: string;
      if (image) imageName = await uploadFile(image);
      await submitConfig(data, imageName);
      toast({
        status: "success",
        title: "Configuration has been updated successfully!",
      });
    } catch (err) {
      console.error(err);
      toast({
        status: "error",
        title: "There was a problem updating the configuration",
      });
    }
  };
  const selectedImage = watch("images")?.[0];

  const clearImage = () => {
    setValue("images", undefined);
    setFilePreviewUrl("");
  };

  useEffect(() => {
    const file = getValues("images")?.[0];
    console.log(file);
    if (file) setFilePreviewUrl(URL.createObjectURL(file));
  }, [watch("images")]);
  return (
    <>
      <Head>
        <title>Feedback: Site Configuration</title>
      </Head>
      <Navbar />
      <Container py="8">
        <chakra.form onSubmit={handleSubmit(submit)}>
          <Heading>Site Configuration</Heading>
          <FormControl mt="8">
            <FormLabel>Question</FormLabel>
            <Input
              {...register("question")}
              placeholder={config.defaultQuestion}
            />
          </FormControl>
          <FormControl mt="4">
            <FormLabel>Branding Image</FormLabel>
            <Stack
              align="center"
              justify="center"
              direction={{ base: "column", sm: "row" }}
              spacing="8"
            >
              {filePreviewUrl && <Image h="40px" src={filePreviewUrl}></Image>}{" "}
              <FileUpload accept="image/*" register={register("images")}>
                <Stack
                  align="center"
                  justify="center"
                  direction={{ base: "column", sm: "row" }}
                >
                  <Button>Browse</Button>
                  <Text>{selectedImage?.name}</Text>
                </Stack>
              </FileUpload>
              <CloseButton onClick={clearImage} hidden={!selectedImage} />
            </Stack>
          </FormControl>
          <FormControl mt="8">
            <FormLabel>Email Address</FormLabel>
            <Input
              {...register("emailAddress")}
              placeholder={config.defaultEmailAddress}
            />
          </FormControl>
          <FormControl mt="8">
            <FormLabel>Email Subject</FormLabel>
            <Input
              {...register("emailSubject")}
              placeholder={config.defaultEmailSubject}
            />
          </FormControl>
          <FormControl mt="8">
            <FormLabel>Email Template</FormLabel>
            <Textarea
              minHeight = '300'
              {...register("emailTemplate")}
              placeholder={config.defaultEmailTemplate}
            />
          </FormControl>

          <Flex width="100%" justifyContent="flex-end">
            <Button
              mt="4"
              disabled={!isDirty}
              type="submit"
            >
              Save
            </Button>
          </Flex>
        </chakra.form>
      </Container>
    </>
  );
};

export default Config;

export const getServerSideProps: GetServerSideProps<ConfigProps> = requireLogin(
  async () => {
    const config = await prisma.config.findMany();
    const question = config.find((item) => item.key === "question");
    const brandingUrl = config.find((item) => item.key === "brandingUrl");
    const emailAddress = config.find((item) => item.key === "emailAddress");
    const emailSubject = config.find((item) => item.key === "emailSubject");
    const emailTemplate = config.find((item) => item.key === "emailTemplate");

    return {
      props: {
        question: question?.value ?? null,
        brandingUrl: brandingUrl?.value ?? null,
        emailAddress: emailAddress?.value ?? null,
        emailSubject: emailSubject?.value ?? null,
        emailTemplate: emailTemplate?.value ?? null,
      },
    };
  }
);

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/images/upload", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Unable to upload image: " + res.statusText);
  return res.text();
};

const submitConfig = async (data: ConfigInputs, imageName: string) => {
  const payload = [{ key: "question", value: data.question }, { key: "emailAddress", value: data.emailAddress }, { key: "emailSubject", value: data.emailSubject }, { key: "emailTemplate", value: data.emailTemplate }];
  if (imageName)
    payload.push({ key: "brandingUrl", value: `/api/images/${imageName}` });
  const res = await fetch("/api/config", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("Unable to update config: " + res.statusText);
};
