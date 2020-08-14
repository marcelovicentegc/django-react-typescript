import React from "react";
import { CardWrapper, StyledCard, ICardProps } from "./style";
import { TStyled } from "../../utils/types";

interface Props extends ICardProps {
  children?: React.ReactNode;
  wrapperProps?: TStyled;
}

export const Card: React.SFC<Props> = ({
  children,
  wrapperProps,
  ...cardProps
}) => {
  return (
    <CardWrapper data-testid="cardWrapper" {...wrapperProps}>
      <StyledCard data-testid="styledCard" {...cardProps}>
        {children}
      </StyledCard>
    </CardWrapper>
  );
};
