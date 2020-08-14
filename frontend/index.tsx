import React from "react";
import GoogleAnalytics from "react-ga";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { render } from "react-dom";
import { getSecrets } from "./config";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme, Theme } from "./utils/theme";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./containers/Routes";

dayjs.extend(LocalizedFormat);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/static/frontend/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}

const { GTAG_ID } = getSecrets();

GoogleAnalytics.initialize(GTAG_ID);
GoogleAnalytics.pageview(window.location.pathname + window.location.search);

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
    * {
      ${(props) => props.theme.fontFamily}
    }

    html {
      width: 100vw;
      min-height: 100vh;    
      overflow-x: hidden;
      
      body {
            margin: 0;
            min-height: 100%;
            overflow-x: hidden;

            div#root {
                min-height: 100%;
            }
        }
    }
`;

const Root: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

render(<Root />, document.getElementById("root"));
