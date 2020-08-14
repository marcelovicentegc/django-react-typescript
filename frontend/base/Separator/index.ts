import { styled } from "../../utils/theme";

export interface ISeparatorProps {
  paddingTop: number;
  paddingBottom: number;
  size?: string | number;
  invisible?: boolean;
  vertical?: boolean;
  color?: string;
}

export const Separator = styled.div<ISeparatorProps>`
  height: 1px;
  ${({
    paddingTop,
    paddingBottom,
    theme,
    size,
    invisible,
    vertical,
    color,
  }) => `padding-top: ${paddingTop}px;
margin-bottom: ${paddingBottom}px;
border-bottom: 1px solid ${
    invisible ? "transparent" : color ? color : theme.color.grey3
  };
width: ${size ? (typeof size === "number" ? `${size}px` : size) : "auto"};
transform: ${vertical ? "rotate(90deg)" : "unset"};`}
`;
