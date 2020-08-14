import { styled } from "../../utils/theme";

export enum TButtonType {
  primary,
  secondary,
  tertiary,
  quaternary,
  quinary,
}

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  transition: 0.2s;
  margin: 0px 8px;
`;

export const StyledButton = styled.button<{
  buttonType: TButtonType;
  disabled?: boolean;
  secondaryDisabled?: boolean;
}>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  box-sizing: border-box;
  border-radius: 22.5px;
  outline: none;
  padding: 8px 30px;
  white-space: nowrap;
  ${({ theme, buttonType, disabled, secondaryDisabled }) =>
    `background-color: ${
      disabled
        ? theme.color.grey9
        : buttonType === TButtonType.primary ||
          buttonType === TButtonType.quaternary ||
          secondaryDisabled
        ? theme.color.green1
        : buttonType === TButtonType.secondary
        ? theme.color.blue6
        : buttonType === TButtonType.quinary
        ? theme.color.white1
        : theme.color.green2
    };
    border: ${
      disabled
        ? theme.color.grey9
        : buttonType === TButtonType.tertiary
        ? `1.5px solid ${theme.color.white1}`
        : buttonType === TButtonType.quinary
        ? `1.5px solid ${theme.color.black1}`
        : "none"
    };
    transition: .2s;
    
    &:focus {
      outline: none;
    }

    cursor: ${disabled || secondaryDisabled ? "not-allowed" : "pointer"};

    &:hover {
      background-color: ${
        disabled
          ? theme.color.grey9
          : buttonType === TButtonType.primary
          ? theme.color.green2
          : buttonType === TButtonType.secondary
          ? theme.color.blue6
          : buttonType === TButtonType.tertiary ||
            buttonType === TButtonType.quinary
          ? theme.color.green1
          : theme.color.green1
      };
      border-color: ${
        disabled
          ? theme.color.grey9
          : buttonType !== TButtonType.primary &&
            buttonType !== TButtonType.secondary &&
            buttonType !== TButtonType.quaternary
          ? theme.color.green1
          : "unset"
      };
    }
  `}
`;
