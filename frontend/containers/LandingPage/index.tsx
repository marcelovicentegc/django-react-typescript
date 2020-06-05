import React from "react";
import { Image, Span, GreetingsBox } from "./style";
import rocketLaunch from "../../icons/rocketLaunch.png";
import { useLandingPageContext } from "../../contexts/LandingPageContext";
import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
const Modal = React.lazy(() => import("./Modal"));

export const LandingPage: React.FC = () => {
  const {
    state,
    hideTipsModal,
    addTip,
    displayTipAdditionModal,
    displayTipEditionModal,
    displayTipsModal,
    removeTip,
    editTip,
  } = useLandingPageContext();

  return (
    <>
      <Header />
      <Layout>
        <React.Suspense fallback={"loading..."}>
          {!!state.modal && (
            <Modal
              state={state}
              hideTipsModal={hideTipsModal}
              addTip={addTip}
              displayTipAdditionModal={displayTipAdditionModal}
              displayTipEditionModal={displayTipEditionModal}
              displayTipsModal={displayTipsModal}
              removeTip={removeTip}
              editTip={editTip}
            />
          )}
        </React.Suspense>
        <GreetingsBox data-testid="greetingsBox">
          <Span data-testid="span">
            The install worked successfully! Congratulations!
          </Span>
          <br />
          <Span data-testid="span">Now go build something great 😃!</Span>
        </GreetingsBox>
        <Image src={rocketLaunch} alt={"Rocket being launched"} />
      </Layout>
    </>
  );
};
