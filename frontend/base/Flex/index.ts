import { styled } from "../../utils/theme";

export const Flex = styled.div<{ style?: React.CSSProperties }>`
  display: flex;
`;

export const Row = styled(Flex)`
  flex-direction: row;
  ${({ style }) => `${typeof style === "object" ? { ...style } : ""}`};
`;

export const Column = styled(Flex)`
  flex-direction: column;
  ${({ style }) => `${typeof style === "object" ? { ...style } : ""}`};
`;
