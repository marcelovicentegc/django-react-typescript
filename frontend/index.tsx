import * as React from "react";
import { render } from "react-dom";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { theme, Theme } from "./utils/theme";
import { LandingPageProvider } from "./contexts/LandingPageContext";
import { register } from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./containers/Routes";

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
    html {
      width: 100vw;
      height: 100vh;    
      overflow-x: hidden;
      
      body {
            ${(props) => props.theme.fontFamily}
            margin: 0;
            height: 100%;

            div#root {
                height: 100%;
            }
        }
    }
`;

const Root: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <LandingPageProvider>
        <GlobalStyle theme={theme} />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </LandingPageProvider>
    </ThemeProvider>
  );
};

render(<Root />, document.getElementById("root"));
register();
