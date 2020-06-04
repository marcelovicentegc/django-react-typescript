import { styled } from "../../utils/theme";
import { ButtonType } from ".";

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  max-width: 200px;
  transition: 0.2s;
  margin: 0px 8px;

  &:hover {
    filter: brightness(1.1);
  }
`;

export const StyledButton = styled.button<{ buttonType: ButtonType }>`
  position: relative;
  border-color: transparent;
  outline: none;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  border-bottom-right-radius: 18px;
  border-bottom-left-radius: 18px;
  border-width: 0 0 4px;
  padding: 13px 16px;
  ${({ theme, buttonType }) =>
    `background-color: ${
      buttonType === ButtonType.primary
        ? theme.color.green1
        : buttonType === ButtonType.secondary
        ? theme.color.white1
        : theme.color.blue3
    }
    color: ${
      buttonType === ButtonType.primary || buttonType === ButtonType.tertiary
        ? theme.color.white1
        : theme.color.blue1
    }
    
    &:after {
      position: absolute;
        background-color: ${
          buttonType === ButtonType.primary
            ? theme.color.green2
            : buttonType === ButtonType.secondary
            ? theme.color.white2
            : theme.color.blue2
        }
      border-color: transparent;
      border-width: 0 0 4px;
      border-radius: 16px;
      bottom: -8px;
      content: "";
      left: 0;
      right: 0;
      z-index: -1;
      top: 0;
    }`}
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

export const Label = styled.span`
  position: relative;
  text-transform: uppercase;
  font-weight: bold;
  top: 1px;
`;
