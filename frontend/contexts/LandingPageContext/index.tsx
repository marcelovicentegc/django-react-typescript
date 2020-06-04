import React from "react";
import { tips } from "../../utils/mocks";

interface LandingPageProviderProps {
  children: React.ReactNode;
}

enum ModalState {
  tips = "tips",
  tipAddition = "tipAddition",
  tipEdition = "tipEdition"
}

interface Tip {
  key: string;
  label: string;
}

interface LandingPageState {
  modal?: ModalState | null;
  tips?: Tip[];
}

enum LandingPageActionType {
  displayTipsModal,
  hideTipsModal,
  displayTipAdditionModal,
  displayTipEditionModal,
  addTip,
  removeTip,
  editTip
}

interface LandingPageAction {
  type: LandingPageActionType;
  args?: Tip;
}

export interface LandingPageContextInterface {
  state: LandingPageState;
  dispatch?: (action: LandingPageAction, args?: Tip) => void;
}

const LandingPageContext = React.createContext<LandingPageContextInterface | null>(
  null
);

export const landingPageReducer = (
  state: LandingPageState,
  action: LandingPageAction
): LandingPageState => {
  switch (action.type) {
    case LandingPageActionType.displayTipsModal: {
      return { modal: ModalState.tips, tips: state.tips };
    }
    case LandingPageActionType.hideTipsModal: {
      return { modal: null, tips: state.tips };
    }
    case LandingPageActionType.displayTipEditionModal: {
      return { modal: ModalState.tipEdition, tips: state.tips };
    }
    case LandingPageActionType.displayTipAdditionModal: {
      return { modal: ModalState.tipAddition, tips: state.tips };
    }
    case LandingPageActionType.addTip: {
      return { tips: [...state.tips, action.args], modal: ModalState.tips };
    }
    case LandingPageActionType.editTip: {
      const tips = state.tips;
      const tipIndex = tips.findIndex(tip => tip.key === action.args.key);

      tips[tipIndex].label = action.args.label;

      return { tips, modal: ModalState.tips };
    }
    case LandingPageActionType.removeTip: {
      const tips = state.tips;
      const tipIndex = tips.findIndex(tip => tip.key === action.args.key);
      tips.splice(tipIndex, 1);

      return {
        tips,
        modal: ModalState.tips
      };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

const useLandingPageContext = () => {
  const context = React.useContext(LandingPageContext);
  if (!context) {
    throw new Error(
      `useLandingPageContext must be used within a LandingPageProvider`
    );
  }
  const { state, dispatch } = context;

  const displayTipsModal = () =>
    dispatch({ type: LandingPageActionType.displayTipsModal });
  const displayTipAdditionModal = () => {
    dispatch({ type: LandingPageActionType.displayTipAdditionModal });
  };
  const displayTipEditionModal = () => {
    dispatch({ type: LandingPageActionType.displayTipEditionModal });
  };
  const hideTipsModal = () =>
    dispatch({ type: LandingPageActionType.hideTipsModal });
  const addTip = (tip: Tip) => {
    dispatch({ type: LandingPageActionType.addTip, args: tip });
  };
  const editTip = (tip: Tip) => {
    dispatch({ type: LandingPageActionType.editTip, args: tip });
  };
  const removeTip = (tip: Tip) => {
    dispatch({ type: LandingPageActionType.removeTip, args: tip });
  };

  return {
    state,
    dispatch,
    displayTipsModal,
    displayTipAdditionModal,
    displayTipEditionModal,
    hideTipsModal,
    addTip,
    removeTip,
    editTip
  };
};

const LandingPageProvider: React.FC<LandingPageProviderProps> = props => {
  const [state, dispatch] = React.useReducer(landingPageReducer, {
    modal: null,
    tips
  });
  const [memoizedState, memoizedDispatch] = React.useMemo(
    () => [state, dispatch],
    [state]
  );
  return (
    <LandingPageContext.Provider
      value={{
        state: memoizedState,
        dispatch: memoizedDispatch
      }}
      {...props}
    />
  );
};

export {
  LandingPageProvider,
  LandingPageContext,
  useLandingPageContext,
  LandingPageState,
  ModalState,
  LandingPageActionType,
  Tip
};
