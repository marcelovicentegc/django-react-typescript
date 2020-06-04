import React from "react";
import { CardWrapper, StyledCard, Title } from "./style";

interface Props {
  children?: React.ReactNode;
  withTitle?: {
    title: string;
    withFunction?: () => void;
  };
}

export const Card: React.SFC<Props> = ({ children, withTitle }) => {
  return (
    <CardWrapper data-testid="cardWrapper">
      <StyledCard data-testid="styledCard">
        {withTitle && (
          <Title
            hoverable={!!withTitle.withFunction}
            onClick={() =>
              withTitle.withFunction ? withTitle.withFunction() : null
            }
            data-testid="title"
            role="button"
          >
            {withTitle.title}
          </Title>
        )}
        {children}
      </StyledCard>
    </CardWrapper>
  );
};
