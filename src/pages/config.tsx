import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Container, Flex, Heading } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import { useToast } from "@chakra-ui/toast";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";
import prisma from "../integrations/db";

type ConfigInputs = {
  question: string;
};

type ConfigProps = {
  question: string;
};

const Config: React.FC<ConfigProps> = ({ question }) => {
  const {
    handleSubmit,
    register,
    formState: { isDirty },
  } = useForm<ConfigInputs>({
    defaultValues: { question },
  });

  const toast = useToast();
  const submitConfig = async (data: ConfigInputs) => {
    await fetch("/api/config", {
      method: "POST",
      body: JSON.stringify([{ key: "question", value: data.question }]),
      headers: { "Content-Type": "application/json" },
    });
    toast({
      status: "success",
      title: "Configuration has been updated successfully!",
    });
  };
  return (
    <>
      <Head>
        <title>Site Configuration</title>
      </Head>
      <Container>
        <chakra.form onSubmit={handleSubmit(submitConfig)}>
          <Heading>Site Configuration</Heading>
          <FormControl mt="8">
            <FormLabel>Question</FormLabel>
            <Input
              {...register("question")}
              placeholder="e.g. how are you finding the performance today?"
            />
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
