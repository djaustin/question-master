import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Container, Flex, Heading, VStack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";

type ConfigInputs = {
  question: string;
};

const Config = () => {
  const { handleSubmit } = useForm<ConfigInputs>();

  return (
    <>
      <Head>
        <title>Site Configuration</title>
      </Head>
      <Container>
        <chakra.form>
          <VStack alignItems="flex-start" spacing="8">
            <Heading>Site Configuration</Heading>
            <FormControl>
              <FormLabel>Question</FormLabel>
              <Input placeholder="e.g. how are you finding the performance today?" />
            </FormControl>
            <Button alignSelf="flex-end" type="submit">
              Save
            </Button>
          </VStack>
        </chakra.form>
      </Container>
    </>
  );
};

export default Config;
