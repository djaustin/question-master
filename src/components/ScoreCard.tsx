import { Box, Text } from "@chakra-ui/react";
import { Response } from "../models/response";
import React from "react";

export type ScoreCardProps = {
  variant: Response;
};

export const ScoreCard: React.FC<ScoreCardProps> = ({ variant, children }) => {
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
  return (
    <Box
      justifyContent="center"
      bg={textBackgroundColor}
      px="2"
      borderRadius="md"
    >
      <Text fontWeight="bold" textAlign="center" color={textColor}>
        {children}
      </Text>
    </Box>
  );
};
