import { Container, Center, Heading, VStack, Button, useColorMode } from "@chakra-ui/react";
import React from "react";
import LikertScale from "../components/likertScale";

const Index = () => {
const {toggleColorMode} = useColorMode();
 return (
  <Container maxW='4xl'>
    <VStack>
      <Heading size="lg" >How are you finding the systems performance today?</Heading>
      <LikertScale/>
      <Button
        onClick={async () =>
          await fetch("/api/feedback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ score: 2 }),
          })
        }
      >
        Submit
      </Button>
      <Button
        onClick={toggleColorMode
        }
      >
        Submit
      </Button>
    </VStack>
  </Container>
 )
};

export default Index;
