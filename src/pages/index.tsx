import {
  Button,
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
  useToast,
  VStack,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import React, { useState } from "react";
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
};

const Index: React.FC<IndexProps> = ({ question, brandingUrl }) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
    watch,
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
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedData),
    });

    if (res.ok) {
      toast({
        description: "Your feedback has been submitted. Thank you!",
        status: "success",
        onCloseComplete: () => window.location.reload(),
      });
    } else {
      toast({
        description: "There was an error submitting your feedback",
        title: res.statusText,
        status: "error",
      });
    }
  };

  return (
    <Container maxW="4xl">
      <Image h="50px" src={brandingUrl} />
      <VStack spacing="8">
        <Heading textAlign="center" size="3xl">
          {question || "How are you finding the system's performance today?"}
        </Heading>
        <form onSubmit={handleSubmit(sendFeedback)}>
          <FormControl isInvalid={!!errors.score}>
            <Controller
              name="score"
              render={({ field }) => <LikertScale fieldProps={field} />}
              control={control}
              rules={{
                required: "Please choose a response before submitting",
              }}
            />
            <FormErrorMessage>{errors.score?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.comment}>
            <FormLabel>
              Add a comment{" "}
              {commentIsMandatory && <chakra.span color="red">*</chakra.span>}
            </FormLabel>
            <Input
              placeholder="Comment"
              {...register("comment", {
                required: {
                  value: commentIsMandatory,
                  message: "Please enter a comment before submitting",
                },
              })}
            />
            <FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
          </FormControl>
          <Checkbox
            mt="6"
            checked={contactUser}
            onChange={(e) => setContactUser(e.target.checked)}
          >
            I would like to be contacted about my issue
          </Checkbox>
          <FormControl
            hidden={!contactUser}
            mt="4"
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
          <Flex mt="8" justify="flex-end">
            <Button size="lg" type="submit">
              Submit
            </Button>
          </Flex>
        </form>
      </VStack>
    </Container>
  );
};

export default Index;

export const getStaticProps: GetStaticProps<IndexProps> = async (req) => {
  const data = await prisma.config.findMany();
  const question = data.find((config) => config.key === "question");
  const brandingUrl = data.find((config) => config.key === "brandingUrl");
  return {
    props: {
      question: question?.value ?? null,
      brandingUrl: brandingUrl?.value ?? null,
    },
    revalidate: 10,
  };
};
