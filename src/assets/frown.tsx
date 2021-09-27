import React from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";

const FrownSvg = (props) => (
  <svg
    aria-label="unhappy"
    width="96"
    height="96"
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="48"
      cy="48"
      r="44"
      stroke={useColorModeValue("black", "white")}
      stroke-width="8"
    />
    <path
      d="M28 70C44.8205 51.889 62.3419 62.4538 69 70"
      stroke={useColorModeValue("black", "white")}
      stroke-width="8"
    />
    <circle
      cx="34.5"
      cy="32.5"
      r="6.5"
      fill={useColorModeValue("black", "white")}
    />
    <circle
      cx="61.5"
      cy="32.5"
      r="6.5"
      fill={useColorModeValue("black", "white")}
    />
  </svg>
);

export default FrownSvg;
