import { styled } from "../../utils/theme";

export const StyledCheckbox = styled.div<{ isChecked: boolean }>`
  ${({ isChecked, theme }) =>
    `border: 1.5px solid ${theme.color.grey8};
    ${
      isChecked ? `background-color: ${theme.color.green1}; border: none;` : ";"
    }
    box-sizing: border-box;
    border-radius: 4px;
    min-width: 24px;
    min-height: 24px;
    max-width: 24px;
    max-height: 24px;
    cursor: pointer;
    transition: .2s;
    display: flex;
    justify-content: center;
    align-items: center;
   
    &:hover {
      border: 1.5px solid ${theme.color.green1};
    }
  `}
`;
