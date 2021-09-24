import {
  Container,
  Center,
  Heading,
  VStack,
  Button,
  useColorMode,
} from "@chakra-ui/react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import LikertScale from "../components/LikertScale";

type FormInputs = {
  score: string;
};

const Index = () => {
  const { handleSubmit, control } = useForm<FormInputs>();
  return (
    <Container maxW="4xl">
      <VStack>
        <Heading size="lg">
          How are you finding the systems performance today?
        </Heading>
        <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
          <Controller
            name="score"
            render={({ field }) => <LikertScale fieldProps={field} />}
            control={control}
          />
          <Button type="submit">Submit</Button>
        </form>
      </VStack>
    </Container>
  );
};

export default Index;
