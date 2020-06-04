import React from "react";
import { InputWrapper, StyledInput } from "./style";

interface Props extends Omit<React.HTMLProps<HTMLInputElement>, "ref" | "as"> {}

export const Input: React.FC<Props> = props => {
  return (
    <InputWrapper data-testid="inputWrapper">
      <StyledInput {...props} data-testid="styledInput" />
    </InputWrapper>
  );
};
