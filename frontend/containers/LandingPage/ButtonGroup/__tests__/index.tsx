import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { ButtonGroup } from "..";
import { fireEvent, render } from "@testing-library/react";
import { generateKey } from "../../../../utils/generateKey";
import { Tip } from "../../../../contexts/LandingPageContext";
import { withTheme } from "../../../../utils/render";

describe("<ButtonGroup /> test case", () => {
  test("test ids are in the document and button labels are visible", () => {
    const mockFunction = jest.fn();
    const { getByTestId, getByText, getAllByRole, queryByText } = render(
      withTheme(
        <ButtonGroup
          tipLabel={"Don't repeat yourself"}
          setTipLabel={mockFunction}
          displayTipsModal={mockFunction}
          tipFunction={mockFunction}
        />
      )
    );

    expect(getByTestId("styledButtonGroup")).toBeInTheDocument();
    expect(getAllByRole("button")).toHaveLength(2);
    expect(getByText("Go back")).toBeVisible();
    expect(queryByText(/Save changes/i)).not.toBeNull();
  });

  test("functions get called", () => {
    const mockFunction = jest.fn();
    const { getAllByRole } = render(
      withTheme(
        <ButtonGroup
          tipLabel={"Don't repeat yourself"}
          setTipLabel={mockFunction}
          displayTipsModal={mockFunction}
          tipFunction={mockFunction}
        />
      )
    );

    const buttons = getAllByRole("button");
    fireEvent.click(buttons[0]);
    expect(mockFunction).toHaveBeenCalledTimes(2);
    fireEvent.click(buttons[1]);
    expect(mockFunction).toHaveBeenCalledTimes(4);
  });

  test("renders tipKey", () => {
    const mockFunction = jest.fn();
    const tipFunction = jest.fn((tip: Tip) => {
      return tip.key;
    });
    const key = generateKey(20);
    const { getAllByRole } = render(
      withTheme(
        <ButtonGroup
          tipLabel={"Don't repeat yourself"}
          setTipLabel={mockFunction}
          displayTipsModal={mockFunction}
          tipFunction={tipFunction}
          tipKey={key}
        />
      )
    );

    fireEvent.click(getAllByRole("button")[1]);
    expect(tipFunction).toReturnWith(key);
  });
});
