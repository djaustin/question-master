import { Container, Center, Heading, VStack, Button } from "@chakra-ui/react";
import React from "react";
import LikertScale from "../components/likertScale";
const Index = () => (
  <Container>
    <VStack>
      <LikertScale />
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
    </VStack>
  </Container>
);

export default Index;
