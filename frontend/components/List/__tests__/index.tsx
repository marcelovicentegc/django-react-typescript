import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { List } from "..";
import { tips } from "../../../utils/mocks";
import { fireEvent, render } from "@testing-library/react";
import { withTheme } from "../../../utils/render";

describe("<List /> test case", () => {
  test("test ids are in the document and items are rendered", () => {
    const { getByTestId, getAllByTestId } = render(
      withTheme(<List items={tips} />)
    );

    expect(getByTestId("unorderedList")).toBeInTheDocument();
    expect(getAllByTestId("listItem")).toHaveLength(tips.length);
  });

  test("renders items with extra functionalities", () => {
    const mockFunction = jest.fn();
    const { getAllByTestId } = render(
      withTheme(
        <List
          items={tips}
          removeItem={mockFunction}
          displayItemEditionModal={mockFunction}
        />
      )
    );

    expect(getAllByTestId("listItem")).toMatchSnapshot();
  });

  test("renders edit option when on edit mode", () => {
    const mockFunction = jest.fn();
    const { queryAllByText } = render(
      withTheme(
        <List
          items={tips}
          displayItemEditionModal={mockFunction}
          getCurrentTipLabel={mockFunction}
          setTipKey={mockFunction}
        />
      )
    );

    const editItemButtons = queryAllByText(/♻️/i);

    expect(editItemButtons).toHaveLength(tips.length);

    for (let i = 0; i < editItemButtons.length; i++) {
      fireEvent.click(editItemButtons[i]);
    }

    expect(mockFunction).toHaveBeenCalledTimes(editItemButtons.length * 3);
  });

  test("renders remove option when removeItem function is passed", () => {
    const removeItem = jest.fn();
    const { queryAllByText } = render(
      withTheme(<List items={tips} removeItem={removeItem} />)
    );

    const removeItemButtons = queryAllByText(/➖/i);
    expect(removeItemButtons).toHaveLength(tips.length);

    for (let i = 0; i < removeItemButtons.length; i++) {
      fireEvent.click(removeItemButtons[i]);
    }

    expect(removeItem).toHaveBeenCalledTimes(removeItemButtons.length);
  });
});
