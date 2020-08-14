import React from "react";
import { StyledCheckbox } from "./style";
import { Row } from "../../base";
import { Text } from "../../typography";
import { theme } from "../../utils/theme";
import { CheckIcon } from "../../icons";

interface IProps {
  label: string;
  onCheck: () => void;
  rowStyle?: React.CSSProperties;
  isChecked?: boolean;
}

export const Checkbox: React.FC<IProps> = ({
  label,
  rowStyle,
  isChecked,
  onCheck,
}) => {
  return (
    <Row style={rowStyle}>
      <StyledCheckbox isChecked={!!isChecked} onClick={onCheck}>
        {isChecked && <CheckIcon />}
      </StyledCheckbox>
      <Text
        fontWeight={"bold"}
        fontSize={16}
        lineHeight={21}
        color={theme.color.grey9}
        style={{
          marginLeft: 10,
        }}
      >
        {label}
      </Text>
    </Row>
  );
};
