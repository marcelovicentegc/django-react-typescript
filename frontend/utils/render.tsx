import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { BrowserRouter } from "react-router-dom";

export const withTheme = (children: React.ReactElement) => {
  return withRouter(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};

export const withRouter = (children: React.ReactElement) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};
