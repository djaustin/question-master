import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LikertScale from "../components/LikertScale";

type FormInputs = {
  score: string;
};

const Index = () => {
  const { handleSubmit, control } = useForm<FormInputs>();
  const sendFeedback: SubmitHandler<FormInputs> = (data) => {
    const parsedData = { ...data, score: parseInt(data.score) };
    fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedData),
    });
  };
  return (
    <Container maxW="4xl">
      <VStack spacing="8">
        <Heading textAlign="center" size="3xl">
          How are you finding the system's performance today?
        </Heading>
        <form onSubmit={handleSubmit(sendFeedback)}>
          <Controller
            name="score"
            render={({ field }) => <LikertScale fieldProps={field} />}
            control={control}
          />
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
