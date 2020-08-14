import { styled } from "../../utils/theme";

export const LayoutWrapper = styled.div<{
  height?: number | string;
  backgroundColor?: string;
}>`
  height: ${({ height }) =>
    height
      ? typeof height === "number"
        ? height + "px"
        : height
      : "calc(100vh - 74px)"};
  display: flex;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor ? backgroundColor : theme.color.white1};
`;

export const StyledLayout = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`;
