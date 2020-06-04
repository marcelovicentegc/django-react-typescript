import React from "react";
import {
  ModalState,
  LandingPageState,
  Tip
} from "../../../contexts/LandingPageContext";
import { CardWrapper } from "./style";
import { Card } from "../../../components/Card";
import { List } from "../../../components/List";
import { Form } from "../../../components/Form";
import { ButtonGroup } from "../ButtonGroup";

interface ModalProps {
  state: LandingPageState;
  hideTipsModal: () => void;
  displayTipAdditionModal: () => void;
  displayTipEditionModal: () => void;
  displayTipsModal: () => void;
  removeTip: (tip: Tip) => void;
  addTip: (tip: Tip) => void;
  editTip: (tip: Tip) => void;
}

export const Modal: React.FC<ModalProps> = ({
  hideTipsModal,
  state,
  displayTipAdditionModal,
  displayTipEditionModal,
  removeTip,
  addTip,
  displayTipsModal,
  editTip
}) => {
  const [tipLabel, setTipLabel] = React.useState("");
  const [tipKey, setTipKey] = React.useState("");
  const [currentTipLabel, setCurrentTipLabel] = React.useState("");

  return (
    <CardWrapper
      data-testid="innerCardWrapper"
      onClick={e => {
        if (e.target === e.currentTarget) {
          hideTipsModal();
        }
      }}
    >
      {state.modal === ModalState.tips && state.tips && (
        <Card
          withTitle={{
            title: "🚀 Tips for a better web app (add a tip)",
            withFunction: displayTipAdditionModal
          }}
        >
          <List
            items={state.tips}
            displayItemEditionModal={displayTipEditionModal}
            removeItem={removeTip}
            setTipKey={setTipKey}
            getCurrentTipLabel={setCurrentTipLabel}
          />
        </Card>
      )}
      {state.modal === ModalState.tipAddition && (
        <Card withTitle={{ title: "➕ Add a tip" }}>
          <Form
            inputs={[
              {
                type: "text",
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setTipLabel(e.target.value);
                },
                placeholder: currentTipLabel,
                value: tipLabel
              }
            ]}
          />
          <ButtonGroup
            displayTipsModal={displayTipsModal}
            setTipLabel={setTipLabel}
            tipLabel={tipLabel}
            tipFunction={addTip}
          />
        </Card>
      )}
      {state.modal === ModalState.tipEdition && (
        <Card withTitle={{ title: "♻️ Edit a tip" }}>
          <Form
            inputs={[
              {
                type: "text",
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setTipLabel(e.target.value);
                },
                placeholder: currentTipLabel,
                value: tipLabel
              }
            ]}
          />
          <ButtonGroup
            displayTipsModal={displayTipsModal}
            setTipLabel={setTipLabel}
            tipLabel={tipLabel}
            tipFunction={editTip}
            tipKey={tipKey}
          />
        </Card>
      )}
    </CardWrapper>
  );
};

export { Modal as default };
