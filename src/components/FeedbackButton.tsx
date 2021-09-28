import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import FrownSvg from "../assets/frown";
import SadSvg from "../assets/sad";
import GrinSvg from "../assets/grin";
import NeutralSvg from "../assets/neutral";
import HappySvg from "../assets/happy";
import { useRadio, UseRadioProps } from "@chakra-ui/radio";

export type FeedbackButtonProps = {
  variant: "frown" | "sad" | "neutral" | "happy" | "grin";
} & UseRadioProps;

export default function FeedbackButton({
  variant,
  ...radioProps
}: FeedbackButtonProps) {
  const { getInputProps, getCheckboxProps } = useRadio(radioProps);
  const inputProps = getInputProps();
  const checkboxProps = getCheckboxProps();
  let svg: ReactElement;
  switch (variant) {
    case "frown":
      svg = <FrownSvg />;
      break;
    case "sad":
      svg = <SadSvg />;
      break;
    case "neutral":
      svg = <NeutralSvg />;
      break;
    case "happy":
      svg = <HappySvg />;
      break;
    case "grin":
      svg = <GrinSvg />;
      break;
  }

  return (
    <Box as="label">
      <input {...getInputProps()}/>
      <Box
        {...getCheckboxProps()}
        p="2"
        borderRadius="lg"
        _checked={{
          bg: useColorModeValue("gray.200", "gray.700"),
        }}
      >
        {svg}
      </Box>
    </Box>
  );
}
