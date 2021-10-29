import { Feedback } from ".prisma/client";
import {
  Box,
  Button,
  Center,
  chakra,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { useState } from "react";
import { useBeforeunload } from "react-beforeunload";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LikertScale from "../components/LikertScale";
import prisma from "../integrations/db";

type FormInputs = {
  score: string;
  username: string;
  comment: string;
};

type IndexProps = {
  question?: string;
  brandingUrl?: string;
  ipLookupUrl?: string;
};

const Index: React.FC<IndexProps> = ({
  question,
  brandingUrl,
  ipLookupUrl,
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);
  useBeforeunload((e) => {
    if (!hasSubmitted) e.preventDefault();
  });
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormInputs>();
  const toast = useToast({
    isClosable: true,
    position: "bottom",
    variant: "solid",
  });
  const [contactUser, setContactUser] = useState(false);
  const commentIsMandatory = watch("score") === "1";

  const sendFeedback: SubmitHandler<FormInputs> = async (data) => {
    const parsedData = { ...data, score: parseInt(data.score) };
    let reqBody: Partial<Feedback> & { clientIp?: string } = parsedData;
    if (ipLookupUrl) {
      const ipRes = await fetch(ipLookupUrl);
      reqBody.clientIp = await ipRes.text();
    }
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reqBody),
    });

    if (res.ok) {
      toast({
        description: "Your feedback has been submitted. Thank you!",
        status: "success",
      });
      reset({ comment: "", username: "" });
      setHasSubmitted(true);
    } else {
      toast({
        description: "There was an error submitting your feedback",
        title: res.statusText,
        status: "error",
      });
    }
  };

  return (
    <Container py="8" maxW="4xl">
      {brandingUrl && (
        <Center mb="8">
          <Image h="200px" src={brandingUrl} />
        </Center>
      )}
      <Head>
        <title>Feedback: Submit</title>
      </Head>
      <Heading textAlign="center" size="3xl">
        {question || "How are you finding the system's performance today?"}
      </Heading>
      <chakra.form mt="8" onSubmit={handleSubmit(sendFeedback)}>
        <VStack spacing="8" align="start">
          <FormControl alignSelf="center" isInvalid={!!errors.score}>
            <Controller
              name="score"
              render={({ field }) => (
                <LikertScale
                  align="center"
                  justify="center"
                  fieldProps={field}
                />
              )}
              control={control}
              rules={{
                required: "Please choose a response before submitting",
              }}
            />
            <FormErrorMessage>{errors.score?.message}</FormErrorMessage>
          </FormControl>
          <FormControl mb="8" isInvalid={!!errors.comment}>
            <FormLabel>
              Add a comment{" "}
              {(commentIsMandatory && (
                <chakra.span color="red">*</chakra.span>
              )) ||
                (contactUser && <chakra.span color="red">*</chakra.span>)}
            </FormLabel>
            <Textarea
              placeholder="Type your comment here..."
              {...register("comment", {
                required: {
                  value: commentIsMandatory || contactUser,
                  message: "Please enter a comment before submitting",
                },
              })}
            />
            <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
          </FormControl>
          <Box>
            <Checkbox
              checked={contactUser}
              onChange={(e) => setContactUser(e.target.checked)}
            >
              I would like to be contacted about my issue
            </Checkbox>
            <FormControl
              mt="2"
              hidden={!contactUser}
              isInvalid={!!errors.username}
            >
              <Input
                placeholder="Username (e.g. az999999)"
                {...register("username", {
                  required: {
                    value: contactUser,
                    message: "Please enter a username to be contacted",
                  },
                })}
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
          </Box>
          <Flex width="100%" justifyContent="flex-end">
            <Button size="lg" type="submit">
              Submit
            </Button>
          </Flex>
        </VStack>
      </chakra.form>
    </Container>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  const data = await prisma.config.findMany();
  const question = data.find((config) => config.key === "question");
  const brandingUrl = data.find((config) => config.key === "brandingUrl");
  return {
    props: {
      question: question?.value ?? null,
      brandingUrl: brandingUrl?.value ?? null,
      ipLookupUrl: process.env.IP_LOOKUP_URL,
    },
  };
};
