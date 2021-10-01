import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Container, Flex, Heading, VStack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/system";
import Head from "next/head";
import React from "react";
import { useForm } from "react-hook-form";

type SettingsInputs = {
  question: string;
};

const Settings = () => {
  const { handleSubmit } = useForm<SettingsInputs>();

  return (
    <>
      <Head>
        <title>Feedback Settings</title>
      </Head>
      <Container>
        <chakra.form>
          <VStack alignItems="flex-start" spacing="8">
            <Heading>Feedback Settings</Heading>
            <FormControl>
              <FormLabel>Question</FormLabel>
              <Input placeholder="How are you finding the performance today?" />
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

export default Settings;
