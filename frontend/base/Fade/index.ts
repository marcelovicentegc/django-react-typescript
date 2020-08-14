import { styled } from "../../utils/theme";

export const FadeBottom = styled.div<{
  width: number;
  height: number;
  bottom: number;
}>`
  position: absolute;
  z-index: 2;
  background-image: linear-gradient(to bottom, rgba(255, 255, 255, 0), #ffffff);
  ${({ width, height, bottom }) => `width: ${width}px;
  height: ${height}px;
  bottom: ${bottom}px;
  `}
`;

export const FadeTop = styled.div<{
  width: number;
  height: number;
  top: number;
}>`
  position: absolute;
  z-index: 2;
  background-image: linear-gradient(to top, rgba(255, 255, 255, 0), #ffffff);
  ${({ width, height, top }) => `width: ${width}px;
  height: ${height}px;
  top: ${top}px;
  `}
`;
