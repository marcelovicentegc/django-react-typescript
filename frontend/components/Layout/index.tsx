import React from "react";
import { LayoutWrapper, StyledLayout } from "./style";

interface Props {
  children: React.ReactNode;
  height?: number | string;
  backgroundColor?: string;
  style?: React.CSSProperties;
}

export const Layout: React.SFC<Props> = ({ children, ...props }) => {
  return (
    <LayoutWrapper data-testid="layoutWrapper" {...props}>
      <StyledLayout data-testid="styledLayout">{children}</StyledLayout>
    </LayoutWrapper>
  );
};
