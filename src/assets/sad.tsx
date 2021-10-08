import React from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";

const SadSvg = (props) => (
  <svg
    aria-label="very unhappy"
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
      strokeWidth="8"
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
    <mask id="path-4-inside-2" fill="white">
      <path d="M23 77C23 73.7169 23.6466 70.466 24.903 67.4329C26.1594 64.3998 28.0009 61.6438 30.3223 59.3223C32.6438 57.0009 35.3998 55.1594 38.4329 53.903C41.4661 52.6466 44.717 52 48 52C51.2831 52 54.534 52.6466 57.5671 53.903C60.6002 55.1594 63.3562 57.0009 65.6777 59.3223C67.9991 61.6438 69.8406 64.3998 71.097 67.4329C72.3534 70.4661 73 73.717 73 77L48 77L23 77Z" />
    </mask>
    <path
      d="M23 77C23 73.7169 23.6466 70.466 24.903 67.4329C26.1594 64.3998 28.0009 61.6438 30.3223 59.3223C32.6438 57.0009 35.3998 55.1594 38.4329 53.903C41.4661 52.6466 44.717 52 48 52C51.2831 52 54.534 52.6466 57.5671 53.903C60.6002 55.1594 63.3562 57.0009 65.6777 59.3223C67.9991 61.6438 69.8406 64.3998 71.097 67.4329C72.3534 70.4661 73 73.717 73 77L48 77L23 77Z"
      stroke={useColorModeValue("black", "white")}
      strokeWidth="16"
      mask="url(#path-4-inside-2)"
    />
  </svg>
);

export default SadSvg;
