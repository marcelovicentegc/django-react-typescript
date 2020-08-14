import baseStyled, { ThemedStyledInterface } from "styled-components";

export const theme = {
  fontFamily: "font-family: 'Barlow', sans-serif;",
  color: {
    white1: "#FFFFFF",
    white2: "#F3F3F3",
    green1: "#0C4B33", // Primary green
    green2: "#44B78B", // Secondary green
    blue3: "#4F68A1", // Facebook blue
    blue4: "#66B3EF", // Twitter blue
    blue5: "#1984BC", // Linkedin blue
    blue6: "#488DDF", // Hover blue
    black1: "#333333",
    grey1: "#BFBFBF",
    grey2: "#DFDFDF",
    grey3: "#E7E7E7",
    grey4: "#8B8B8B",
    grey5: "#D9D9D9",
    grey6: "#F9F9F9",
    grey7: "#A2A1A1",
    grey8: "#C8C8C8",
    grey9: "#B5B5B5",
    grey10: "#808080",
    grey11: "#979797",
    grey12: "#FAFAFA",
    red1: "#C93838",
  },
};

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
