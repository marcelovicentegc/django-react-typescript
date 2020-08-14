import { styled } from "../../utils/theme";
import { Row } from "../../base";

export const StyledPaginationBox = styled(Row)<{ isSelected?: boolean }>`
  border: 1.5px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.color.green1 : theme.color.grey8};
  box-sizing: border-box;
  border-radius: 4px;
  width: 29px;
  height: 29px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin: 0px 5px;
`;
