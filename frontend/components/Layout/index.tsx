import React from "react";
import { LayoutWrapper, StyledLayout } from "./style";

interface Props {
  children: React.ReactNode;
}

export const Layout: React.SFC<Props> = ({ children }) => {
  return (
    <LayoutWrapper data-testid="layoutWrapper">
      <StyledLayout data-testid="styledLayout">{children}</StyledLayout>
    </LayoutWrapper>
  );
};
