import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box } from "@chakra-ui/layout";
import React, { ReactElement } from "react";
import FrownSvg from "../assets/frown";
import SadSvg from "../assets/sad";
import GrinSvg from "../assets/grin";
import NeutralSvg from "../assets/neutral";
import HappySvg from "../assets/happy";


export type FeedbackButtonProps = {
  variant: 'frown' | 'sad' | 'neutral' | 'happy' | 'grin'
}

export default function FeedbackButton({variant}: FeedbackButtonProps ) {
  let svg: ReactElement;
  switch(variant){ 
    case "frown":
      svg = <FrownSvg/>;
      break;
    case "sad": 
      svg = <SadSvg/>;
      break;
    case 'neutral':
      svg = <NeutralSvg/>;
      break;
    case 'happy': 
      svg = <HappySvg/>;
      break;
    case 'grin':
      svg = <GrinSvg/>;
      break;
  }
  
  return (
    <Box
      p="1"
      color="red"
      textColor="red"
      borderRadius="lg"
      _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
    >
      {svg}
    </Box>
  );
}
