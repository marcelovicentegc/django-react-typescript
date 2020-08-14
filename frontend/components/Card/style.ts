import { styled } from "../../utils/theme";

export interface ICardProps {
  withOutline?: boolean;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

export const CardWrapper = styled.div``;

export const StyledCard = styled.div<ICardProps>`
  display: flex;
  flex-direction: column;
  ${({ theme, withOutline, width, height, style }) => `background: ${
    theme.color.white1
  };
  ${
    withOutline
      ? `border: 1.5px solid ${theme.color.grey2};`
      : "box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);"
  };
  border-radius: 10px;
  margin:18px;
  padding: 32px;
  width: ${width ? width + "px" : ""};
  height: ${height ? height + "px" : ""};
  ${typeof style === "object" ? { ...style } : ""};
`}
`;
