import React from "react";
import {
  HeaderWrapper,
  StyledHeader,
  LeftSide,
  RightSide,
  AppTitle
} from "./style";
import { Button, ButtonType } from "../Button";
import { useLandingPageContext } from "../../contexts/LandingPageContext";

export const Header: React.FC = () => {
  const { state, displayTipsModal, hideTipsModal } = useLandingPageContext();

  return (
    <HeaderWrapper data-testid="headerWrapper">
      <StyledHeader data-testid="styledHeader">
        <LeftSide data-testid="leftSide">
          <AppTitle data-testid="appTitle" />
        </LeftSide>
        <RightSide data-testid="rightSide ">
          <Button
            label={"Tips"}
            onClick={() =>
              !!state.modal ? hideTipsModal() : displayTipsModal()
            }
          />
          <Button label={"Documentation"} type={ButtonType.tertiary} />
          <Button
            label={"Github"}
            type={ButtonType.secondary}
            onClick={() =>
              window.open(
                "https://github.com/marcelovicentegc/react-typescript-client",
                "_blank"
              )
            }
          />
        </RightSide>
      </StyledHeader>
    </HeaderWrapper>
  );
};
