import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Modal } from "..";
import { fireEvent, render } from "@testing-library/react";
import { ModalState } from "../../../../contexts/LandingPageContext";
import { tips } from "../../../../utils/mocks";
import { withTheme } from "../../../../utils/render";

describe("<Modal /> test case", () => {
  test("test ids are in the document", () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(
      withTheme(
        <Modal
          state={{
            modal: ModalState.tips
          }}
          displayTipAdditionModal={mockFunction}
          displayTipEditionModal={mockFunction}
          displayTipsModal={mockFunction}
          editTip={mockFunction}
          addTip={mockFunction}
          removeTip={mockFunction}
          hideTipsModal={mockFunction}
        />
      )
    );

    expect(getByTestId("innerCardWrapper")).toBeInTheDocument();
  });

  test("tips are rendered", () => {
    const mockFunction = jest.fn();
    const { container } = render(
      withTheme(
        <Modal
          state={{
            modal: ModalState.tips,
            tips
          }}
          displayTipAdditionModal={mockFunction}
          displayTipEditionModal={mockFunction}
          displayTipsModal={mockFunction}
          editTip={mockFunction}
          addTip={mockFunction}
          removeTip={mockFunction}
          hideTipsModal={mockFunction}
        />
      )
    );

    const listItems = container.getElementsByTagName("li");
    expect(listItems.length).toBe(tips.length);
  });

  test("tips are rendered", () => {
    const mockFunction = jest.fn();
    const { container, queryByText } = render(
      withTheme(
        <Modal
          state={{
            modal: ModalState.tips,
            tips
          }}
          displayTipAdditionModal={mockFunction}
          displayTipEditionModal={mockFunction}
          displayTipsModal={mockFunction}
          editTip={mockFunction}
          addTip={mockFunction}
          removeTip={mockFunction}
          hideTipsModal={mockFunction}
        />
      )
    );

    const listItems = container.getElementsByTagName("li");
    expect(listItems.length).toBe(tips.length);
    expect(
      queryByText("🚀 Tips for a better web app (add a tip)")
    ).toBeVisible();
  });

  test("tips addition modal is rendered", () => {
    const mockFunction = jest.fn();
    const { container, queryByText, getByDisplayValue } = render(
      withTheme(
        <Modal
          state={{
            modal: ModalState.tipAddition
          }}
          displayTipAdditionModal={mockFunction}
          displayTipEditionModal={mockFunction}
          displayTipsModal={mockFunction}
          editTip={mockFunction}
          addTip={mockFunction}
          removeTip={mockFunction}
          hideTipsModal={mockFunction}
        />
      )
    );

    const inputs = container.getElementsByTagName("input");

    const inputValue = "Test what you're writing!";

    expect(queryByText(/add a tip/i)).not.toBeNull();
    expect(inputs.length).toBe(1);
    fireEvent.change(inputs[0], {
      target: { value: inputValue }
    });
    expect(getByDisplayValue(inputValue)).toBeInTheDocument();
  });

  test("tips edition modal is rendered", () => {
    const mockFunction = jest.fn();
    const { container, queryByText, getByDisplayValue } = render(
      withTheme(
        <Modal
          state={{
            modal: ModalState.tipEdition
          }}
          displayTipAdditionModal={mockFunction}
          displayTipEditionModal={mockFunction}
          displayTipsModal={mockFunction}
          editTip={mockFunction}
          addTip={mockFunction}
          removeTip={mockFunction}
          hideTipsModal={mockFunction}
        />
      )
    );

    const inputs = container.getElementsByTagName("input");

    const inputValue = "Test what you're writing!";

    expect(queryByText(/edit a tip/i)).not.toBeNull();
    expect(inputs.length).toBe(1);
    fireEvent.change(inputs[0], {
      target: { value: inputValue }
    });
    expect(getByDisplayValue(inputValue)).toBeInTheDocument();
  });

  test("calls hideTipsModal function", () => {
    const mockFunction = jest.fn();
    const hideTipsModal = jest.fn();
    const { getByTestId } = render(
      withTheme(
        <Modal
          state={{
            modal: ModalState.tipEdition
          }}
          displayTipAdditionModal={mockFunction}
          displayTipEditionModal={mockFunction}
          displayTipsModal={mockFunction}
          editTip={mockFunction}
          addTip={mockFunction}
          removeTip={mockFunction}
          hideTipsModal={hideTipsModal}
        />
      )
    );

    fireEvent.click(getByTestId("innerCardWrapper"));
    expect(hideTipsModal).toHaveBeenCalled();
  });

  test("doesn't calls hideTipsModal function", () => {
    const mockFunction = jest.fn();
    const hideTipsModal = jest.fn();
    const { container } = render(
      withTheme(
        <Modal
          state={{
            modal: ModalState.tipEdition
          }}
          displayTipAdditionModal={mockFunction}
          displayTipEditionModal={mockFunction}
          displayTipsModal={mockFunction}
          editTip={mockFunction}
          addTip={mockFunction}
          removeTip={mockFunction}
          hideTipsModal={hideTipsModal}
        />
      )
    );

    const buttons = container.getElementsByTagName("button");

    fireEvent.click(buttons[0]);

    expect(hideTipsModal).not.toHaveBeenCalled();
  });
});
