import { VStack, Box, SpacerProps } from "@chakra-ui/layout";
import React from "react";
import FrownSvg from "../assets/frown";
import GrinSvg from "../assets/grin";
import HappySvg from "../assets/happy";
import NeutralSvg from "../assets/neutral";
import SadSvg from "../assets/sad";

export type ResponseCountProps = {
  variant: "very unhappy" | "unhappy" | "neutral" | "happy" | "very happy";
  count: number;
} & SpacerProps;

export const ResponseCount: React.FC<ResponseCountProps> = ({
  variant,
  count,
  ...spacerProps
}) => {
  let svg;
  switch (variant) {
    case "very unhappy":
      svg = <SadSvg />;
      break;
    case "unhappy":
      svg = <FrownSvg />;
      break;
    case "neutral":
      svg = <NeutralSvg />;
      break;
    case "happy":
      svg = <HappySvg />;
      break;
    case "very happy":
      svg = <GrinSvg />;
      break;
  }
  return (
    <VStack {...spacerProps}>
      {svg}
      <Box bg="teal.500" color="white" px="2" borderRadius="md">
        {count}
      </Box>
    </VStack>
  );
};
