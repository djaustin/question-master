import { Button, Text, Image } from "@chakra-ui/react";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup } from "@chakra-ui/input";
import { Container, Flex, Heading } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { useToast } from "@chakra-ui/toast";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUpload from "../components/FileUpload";
import prisma from "../integrations/db";

type ConfigInputs = {
  question: string;
  images: FileList;
};

type ConfigProps = {
  question: string;
};

const Config: React.FC<ConfigProps> = ({ question }) => {
  const {
    handleSubmit,
    register,
    formState: { isDirty },
    watch,
    getValues,
  } = useForm<ConfigInputs>({
    defaultValues: { question },
  });
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>("");
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

  useEffect(() => {
    const file = getValues("images")?.[0];
    console.log(file);
    if (file) setFilePreviewUrl(URL.createObjectURL(file));
  }, [watch("images")]);
  return (
    <>
      <Head>
        <title>Site Configuration</title>
      </Head>
      <Container py="8">
        <chakra.form onSubmit={handleSubmit(submit)}>
          <Heading>Site Configuration</Heading>
          <FormControl mt="8">
            <FormLabel>Question</FormLabel>
            <Input
              {...register("question")}
              placeholder="e.g. how are you finding the performance today?"
            />
          </FormControl>
          <FormControl mt="8">
            <FormLabel>Branding Image</FormLabel>
            <FileUpload accept="image/*" register={register("images")}>
              <Button>Browse</Button>
            </FileUpload>
            <Text>{watch("images")?.[0]?.name}</Text>
            <Image src={filePreviewUrl}></Image>
          </FormControl>

          <Flex justify="end">
            <Button
              mt="4"
              disabled={!isDirty}
              alignSelf="flex-end"
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

export const getServerSideProps: GetServerSideProps<ConfigProps> = async (
  req
) => {
  const config = await prisma.config.findMany();
  const question = config.find((item) => item.key === "question");
  return {
    props: {
      question: question?.value ?? null,
    },
  };
};

const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/images/upload", {
    method: "POST",
    body: formData,
  });
  return res.text();
};
const submitConfig = async (data: ConfigInputs, imageName: string) => {
  fetch("/api/config", {
    method: "POST",
    body: JSON.stringify([
      { key: "question", value: data.question },
      { key: "brandingUrl", value: `/api/images/${imageName}` },
    ]),
    headers: { "Content-Type": "application/json" },
  });
};
