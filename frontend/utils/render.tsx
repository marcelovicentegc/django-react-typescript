import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { LandingPageProvider } from "../contexts/LandingPageContext";

export const withTheme = (children: React.ReactElement) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export const withContextProvider = (children: React.ReactElement) => {
  return <LandingPageProvider>{children}</LandingPageProvider>;
};
