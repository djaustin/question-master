import { VStack, Box, SpacerProps, Text } from "@chakra-ui/layout";
import { Theme } from "@chakra-ui/theme";
import React from "react";
import FrownSvg from "../assets/frown";
import GrinSvg from "../assets/grin";
import HappySvg from "../assets/happy";
import NeutralSvg from "../assets/neutral";
import SadSvg from "../assets/sad";
import { ScoreCard } from "./ScoreCard";

export type ResponseCountProps = {
  variant: "very unhappy" | "unhappy" | "neutral" | "happy" | "very happy";
  count: number;
} & SpacerProps;

export const ResponseCount: React.FC<ResponseCountProps> = ({
  variant,
  count,
  ...spacerProps
}) => {
  let svg = svgVariant(variant);
  return (
    <VStack spacing="4" {...spacerProps}>
      {svg}
      <ScoreCard size="lg" variant={variant}>
        {count || 0}
      </ScoreCard>
    </VStack>
  );
};

function svgVariant(variant: string) {
  switch (variant) {
    case "very unhappy":
      return <SadSvg />;
    case "unhappy":
      return <FrownSvg />;
    case "neutral":
      return <NeutralSvg />;
    case "happy":
      return <HappySvg />;
    case "very happy":
      return <GrinSvg />;
  }
}
