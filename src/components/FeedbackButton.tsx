import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import Image from "next/image";
import React from "react";
import frown from "../assets/frown.svg";

export default function FeedbackButton() {
  return (
    <Box
      h="50px"
      w="50px"
      p="1"
      color="red"
      textColor="red"
      borderRadius="lg"
      _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
    >
      <Image src={frown} />
    </Box>
  );
}
