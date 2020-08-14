import { styled } from "../../utils/theme";
import { Box } from "../../base";

export const StyledButton = styled(Box)`
  cursor: pointer;
  width: 45px;
  height: 45px;
  background: ${({ theme }) => theme.color.white1};
  border-radius: 100px;
  justify-content: center;
  align-items: center;
`;
