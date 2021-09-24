import { Stack, StackProps, useRadioGroup } from "@chakra-ui/react";
import React from "react";
import { ControllerRenderProps } from "react-hook-form";
import FeedbackButton, { FeedbackButtonProps } from "./FeedbackButton";

const responses: { variant: FeedbackButtonProps["variant"]; value: string }[] =
  [
    { variant: "sad", value: "1" },
    { variant: "frown", value: "2" },
    { variant: "neutral", value: "3" },
    { variant: "happy", value: "4" },
    { variant: "grin", value: "5" },
  ];

export type LikertScaleProps = {
  fieldProps?: ControllerRenderProps;
} & StackProps;

const LikertScale: React.FC<LikertScaleProps> = ({
  fieldProps,
  ...stackProps
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup();
  return (
    <Stack
      {...stackProps}
      {...getRootProps()}
      {...fieldProps}
      direction={{ base: "column", md: "row" }}
    >
      {responses.map(({ variant, value }) => {
        const radioProps = getRadioProps({ value });
        return <FeedbackButton key={value} variant={variant} {...radioProps} />;
      })}
    </Stack>
  );
};

export default LikertScale;
