import React from "react";
import { FormWrapper, StyledForm } from "./style";
import { Input } from "../Input";

interface Props extends Omit<React.HTMLProps<HTMLFormElement>, "ref" | "as"> {
  inputs: React.HTMLProps<HTMLInputElement>[];
}

export const Form: React.SFC<Props> = ({ inputs, ...props }) => {
  return (
    <FormWrapper data-testid="formWrapper">
      <StyledForm {...props} data-testid="styledForm">
        {inputs.map((input, i) => {
          return <Input {...input} key={i} />;
        })}
      </StyledForm>
    </FormWrapper>
  );
};
