import { Stack, Image as ChakraImage, Icon } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import FeedbackButton from "./FeedbackButton";

const LikertScale = () => (
  <Stack direction={{ base: "column", sm: "row" }}>
    <FeedbackButton />
    <FeedbackButton />
    <FeedbackButton />
    <FeedbackButton />
    <FeedbackButton />
  </Stack>
);

export default LikertScale;
