import React from "react";
import { ButtonWrapper, StyledButton, TButtonType } from "./style";
import { Text } from "../../typography";
import { theme } from "../../utils/theme";
import { Loading } from "../Loading";

interface Props
  extends Omit<React.HTMLProps<HTMLButtonElement>, "type" | "as" | "ref"> {
  label: string;
  type?: TButtonType;
  disabled?: boolean;
  loading?: boolean;
  secondaryLoading?: boolean;
  secondaryDisabled?: boolean;
  wrapperProps?: Omit<React.HTMLProps<HTMLDivElement>, "as" | "ref">;
}

export const Button: React.FC<Props> = ({
  label,
  type,
  wrapperProps,
  disabled,
  loading,
  secondaryLoading,
  secondaryDisabled,
  ...props
}) => {
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <ButtonWrapper
      data-testid="buttonWrapper"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...wrapperProps}
    >
      <StyledButton
        {...props}
        buttonType={type ? type : TButtonType.primary}
        disabled={disabled}
        secondaryDisabled={secondaryDisabled}
        data-testid="styledButton"
      >
        {loading || secondaryLoading ? (
          <Loading onButton secondary={secondaryLoading} />
        ) : (
          <Text
            fontSize={18}
            lineHeight={25}
            fontWeight={"bold"}
            color={
              (type === TButtonType.quaternary && !isHovering) ||
              (type === TButtonType.quaternary && secondaryDisabled)
                ? "rgba(255, 255, 255, 0.7)"
                : type === TButtonType.quinary && !isHovering
                ? theme.color.black1
                : theme.color.white1
            }
            data-testid="label"
          >
            {label}
          </Text>
        )}
      </StyledButton>
    </ButtonWrapper>
  );
};
