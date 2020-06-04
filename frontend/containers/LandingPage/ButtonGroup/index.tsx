import React from "react";
import { StyledButtonGroup } from "./style";
import { Button, ButtonType } from "../../../components/Button";
import { Tip } from "../../../contexts/LandingPageContext";
import { generateKey } from "../../../utils/generateKey";

interface Props {
  tipLabel: string;
  tipKey?: string;
  displayTipsModal: () => void;
  setTipLabel: (tipLabel: string) => void;
  tipFunction: (tip: Tip) => void;
}

export const ButtonGroup: React.SFC<Props> = ({
  displayTipsModal,
  setTipLabel,
  tipLabel,
  tipFunction,
  tipKey
}) => {
  return (
    <StyledButtonGroup data-testid="styledButtonGroup">
      <Button
        type={ButtonType.tertiary}
        label={"Go back"}
        onClick={() => {
          displayTipsModal();
          setTipLabel("");
        }}
      />
      <Button
        label={"Save changes"}
        onClick={() => {
          tipFunction({
            label: tipLabel,
            key: tipKey ? tipKey : generateKey(10)
          });
          setTipLabel("");
        }}
      />
    </StyledButtonGroup>
  );
};
