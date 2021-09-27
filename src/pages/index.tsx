import {
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ChangeEvent } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import CommentComponent from "../components/CommentComponent";
import LikertScale from "../components/LikertScale";

type FormInputs = {
  score: string;
  username: string;
};

const Index = () => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<FormInputs>();
  const [contactUser, setContactUser] = useState(false);
  const [ comment, setComment ] = useState();
  const [ feedbackValue, setFeedbackValue ] = useState();
  const [ errorNoInput, setErrorNoInput ] = useState(false);

  const onCommentChange = (event: ChangeEvent) => {
    setComment(event.target.value);
    setErrorNoInput(false);
  };
  const onFeedbackChange = (event: ChangeEvent) => {
    setFeedbackValue(event.target.value);
    if(event.target.value != 1){
      setErrorNoInput(false);
    }
  };

  const sendFeedback: SubmitHandler<FormInputs> = (data) => {
    if(feedbackValue == 1 && !comment){
      setErrorNoInput(true);      
    } else {  
      const parsedData = { ...data, score: parseInt(data.score) };
      fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedData),
      });
    }
  };

  return (
    <Container maxW="4xl">
      <VStack spacing="8">
        <Heading textAlign="center" size="3xl">
          How are you finding the system's performance today?
        </Heading>
        <form onSubmit={handleSubmit(sendFeedback)}>
          <FormControl isInvalid={!!errors.score}>
            <Controller
              name="score"
              render={({ field }) => <LikertScale fieldProps={field} />}
              control={control}
              rules={{
                required: "Please choose a score before submitting",
              }}
            />
            <FormErrorMessage>{errors.score?.message}</FormErrorMessage>
          </FormControl>
          <CommentComponent onCommentChange={onCommentChange} errorNoInput={errorNoInput}/>
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
