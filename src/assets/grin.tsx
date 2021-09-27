import React from "react";
import { useColorModeValue } from "@chakra-ui/color-mode";

const GrinSvg = (props) => (
  <svg
    aria-label="very happy"
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
    <mask id="path-4-inside-1" fill="white">
      <path d="M73 55C73 58.283 72.3534 61.5339 71.097 64.5671C69.8406 67.6002 67.9991 70.3562 65.6777 72.6777C63.3562 74.9991 60.6002 76.8406 57.5671 78.097C54.5339 79.3534 51.283 80 48 80C44.717 80 41.4661 79.3534 38.4329 78.097C35.3998 76.8406 32.6438 74.9991 30.3223 72.6777C28.0009 70.3562 26.1594 67.6002 24.903 64.5671C23.6466 61.5339 23 58.283 23 55L48 55H73Z" />
    </mask>
    <path
      d="M73 55C73 58.283 72.3534 61.5339 71.097 64.5671C69.8406 67.6002 67.9991 70.3562 65.6777 72.6777C63.3562 74.9991 60.6002 76.8406 57.5671 78.097C54.5339 79.3534 51.283 80 48 80C44.717 80 41.4661 79.3534 38.4329 78.097C35.3998 76.8406 32.6438 74.9991 30.3223 72.6777C28.0009 70.3562 26.1594 67.6002 24.903 64.5671C23.6466 61.5339 23 58.283 23 55L48 55H73Z"
      stroke={useColorModeValue("black", "white")}
      stroke-width="16"
      mask="url(#path-4-inside-1)"
    />
  </svg>
);

export default GrinSvg;
