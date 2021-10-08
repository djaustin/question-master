import React from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";

const NeutralSvg = (props) => (
  <svg
    aria-label="neutral"
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
      strokeWidth="4"
    />
    <path
      d="M27 64C44.2308 64 62.1795 64 69 64"
      stroke={useColorModeValue("black", "white")}
      strokeWidth="4"
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

export default NeutralSvg;
