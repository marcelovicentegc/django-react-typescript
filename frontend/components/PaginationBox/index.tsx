import React from "react";
import { StyledPaginationBox } from "./style";
import { TStyled } from "../../utils/types";
import { theme } from "../../utils/theme";
import { Text } from "../../typography";
import { ArrowNextIcon, ArrowBackIcon } from "../../icons";

interface IProps extends TStyled {
  page: number | "next" | "back";
  isSelected?: boolean;
}

export const PaginationBox: React.FC<IProps> = ({
  page,
  isSelected,
  ...props
}) => {
  return (
    <StyledPaginationBox isSelected={isSelected} {...props}>
      <Text
        fontSize={14}
        lineHeight={18}
        fontWeight={"bold"}
        color={isSelected ? theme.color.green1 : theme.color.grey7}
      >
        {page === "next" ? (
          <ArrowNextIcon />
        ) : page === "back" ? (
          <ArrowBackIcon />
        ) : (
          page
        )}
      </Text>
    </StyledPaginationBox>
  );
};
