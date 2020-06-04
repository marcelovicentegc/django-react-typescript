import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { LandingPage } from "..";
import { waitForElement, render } from "@testing-library/react";
import { tips } from "../../../utils/mocks";
import {
  LandingPageContext,
  ModalState
} from "../../../contexts/LandingPageContext";
import { withTheme, withContextProvider } from "../../../utils/render";

describe("<LandingPage /> test case", () => {
  test("test ids and default content are in the document", () => {
    const { container, getByTestId, getAllByTestId } = render(
      withTheme(withContextProvider(<LandingPage />))
    );

    expect(getByTestId("greetingsBox")).toBeInTheDocument();
    expect(getAllByTestId("span")).toHaveLength(2);
    expect(container).toHaveTextContent(
      "The install worked successfully! Congratulations!"
    );
    expect(container).toHaveTextContent("Now go build something great 😃!");
    expect(container.getElementsByTagName("img")).toHaveLength(1);
  });

  test("renders suspense fallback", () => {
    const mockFunction = jest.fn();
    const tree = (
      <LandingPageContext.Provider
        value={{
          state: {
            modal: ModalState.tips,
            tips
          },
          dispatch: mockFunction
        }}
      >
        <LandingPage />
      </LandingPageContext.Provider>
    );
    const { getByText } = render(withTheme(withContextProvider(tree)));

    expect(getByText("loading...")).toBeInTheDocument();
  });

  test("renders tips card", async () => {
    const mockFunction = jest.fn();
    const tree = (
      <LandingPageContext.Provider
        value={{
          state: {
            modal: ModalState.tips,
            tips
          },
          dispatch: mockFunction
        }}
      >
        <LandingPage />
      </LandingPageContext.Provider>
    );
    const { getByTestId } = render(withTheme(withContextProvider(tree)));

    const modal = await waitForElement(() => getByTestId("innerCardWrapper"));

    expect(modal).toBeVisible();
  });
});
