import { styled } from "../../utils/theme";

export interface ITextProps {
  fontSize: string | number;
  lineHeight: string | number;
  fontWeight?: string | number;
  color?: string;
  style?: React.CSSProperties;
  hoverColor?: string;
}

export const Text = styled.span<ITextProps>`
  ${({ theme, fontSize, lineHeight, fontWeight, color, style, hoverColor }) => `
    font-family: Barlow;
    font-style: normal;
    font-weight: ${fontWeight ? fontWeight : "normal"};
    font-size: ${fontSize}px;
    line-height: ${
      typeof lineHeight === "number" ? `${lineHeight}px` : lineHeight
    }; 
    color: ${color ? color : theme.color.black1};
    transport: .2s;
    ${style ? { ...style } : ""};
    
    &:hover {
      color: ${hoverColor ? hoverColor : color ? color : theme.color.black1};
    }`}
`;
