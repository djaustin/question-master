import { Box, Center, Text, Theme } from "@chakra-ui/react";
import { Response } from "../models/response";
import React from "react";
import { LayoutProps } from "framer-motion";

export type ScoreCardProps = {
  variant: Response;
  size?: "md" | "lg";
};

export const ScoreCard: React.FC<ScoreCardProps> = ({
  variant,
  size = "md",
  children,
}) => {
  let { textBackgroundColor, textColor } = colorVariants(variant);
  let { fontSize, boxSize } = sizeVariants(size);
  return (
    <Center
      h={boxSize}
      w={boxSize}
      justifyContent="center"
      bg={textBackgroundColor}
      px={size === "md" && 2}
      borderRadius="md"
    >
      <Text
        verticalAlign="center"
        fontSize={fontSize}
        fontWeight="black"
        color={textColor}
      >
        {children}
      </Text>
    </Center>
  );
};
function colorVariants(variant: string) {
  let textBackgroundColor: string,
    textColor: string = "white";
  switch (variant) {
    case "very unhappy":
      textBackgroundColor = "#FF0000";
      break;
    case "unhappy":
      textBackgroundColor = "#FF6900";
      break;
    case "neutral":
      textBackgroundColor = "#FFD300";
      textColor = "black";
      break;
    case "happy":
      textBackgroundColor = "#9FFF00";
      textColor = "black";
      break;
    case "very happy":
      textBackgroundColor = "#51bf03";
      break;
  }
  return { textBackgroundColor, textColor };
}
function sizeVariants(size: "md" | "lg") {
  let fontSize: string, boxSize: string;
  switch (size) {
    case "lg":
      fontSize = "5xl";
      boxSize = "96px";
    case "md":
      break;
  }
  return { fontSize, boxSize };
}
