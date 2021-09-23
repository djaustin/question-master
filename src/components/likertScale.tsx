import { Stack } from "@chakra-ui/react";
import React from "react";
import FeedbackButton, { FeedbackButtonProps } from "./FeedbackButton";

const responses: FeedbackButtonProps['variant'][] = ['sad', 'frown', 'neutral', 'happy', 'grin'] 

const LikertScale = () => (
  <Stack direction={{ base: "column", sm: "row" }} >
    {responses.map(variant => <FeedbackButton key={variant} variant={variant}/>)}
  </Stack>
);

export default LikertScale;
