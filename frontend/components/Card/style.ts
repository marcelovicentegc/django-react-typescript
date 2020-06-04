import { styled } from "../../utils/theme";

export const CardWrapper = styled.div``;

export const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  ${({ theme }) => `background: ${theme.color.white1};
  border: 2px solid ${theme.color.grey1};`};
  border-radius: 16px;
  margin: 0 24px 24px;
  padding: 24px;
`;

export const Title = styled.span<{ hoverable: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 0px 22px 0px;
  font-weight: bold;
  text-transform: uppercase;
  ${({ hoverable }) => (hoverable ? "cursor: pointer" : "cursor: default")}
`;
