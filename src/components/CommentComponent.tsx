import { Box } from "@chakra-ui/layout";
import React, { ChangeEvent } from "react";
import { Input, Text } from "@chakra-ui/react"

export type CommentComponentProps = {
  onCommentChange: (event: ChangeEvent) => void;
  errorNoInput: boolean;
};

export default function CommentComponent({
  onCommentChange,
  errorNoInput
}: CommentComponentProps) {

  return (
    <Box as="label" p="8">
      <Text>Add a comment</Text>
      {errorNoInput ? 
        <Input onChange={onCommentChange} isInvalid/> 
        :
        <Input onChange={onCommentChange} />
      }
    </Box>
  );
}
