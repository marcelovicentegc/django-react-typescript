import React from "react";
import { StyledButton } from "./style";
import { ArrowBackIcon, CloseIcon } from "../../icons";
import { theme } from "../../utils/theme";
import { TStyled } from "../../utils/types";

interface IProps extends TStyled {
  type?: "return" | "close";
}

export const BackButton: React.FC<IProps> = (props) => {
  return (
    <StyledButton {...props}>
      {!props.type || (props.type && props.type === "return") ? (
        <ArrowBackIcon color={theme.color.green1} />
      ) : (
        <CloseIcon />
      )}
    </StyledButton>
  );
};
