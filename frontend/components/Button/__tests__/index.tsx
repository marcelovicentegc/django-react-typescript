import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Button } from "..";
import { withTheme } from "../../../utils/render";
import { fireEvent } from "@testing-library/react";
import { render } from "@testing-library/react";

describe("<Button /> test case", () => {
  test("test ids are in the document", () => {
    const { getByTestId } = render(withTheme(<Button label="Click me" />));

    expect(getByTestId("buttonWrapper")).toBeInTheDocument();
    expect(getByTestId("styledButton")).toBeInTheDocument();
    expect(getByTestId("label")).toBeInTheDocument();
  });

  test("onClick prop is called", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      withTheme(<Button label="Click me" onClick={onClick} />)
    );

    fireEvent.click(getByTestId("styledButton"), { button: 1 });
    expect(onClick).toHaveBeenCalled();
  });

  test("renders passed label prop", () => {
    const { getByTestId } = render(withTheme(<Button label="Click me" />));

    expect(getByTestId("label")).toHaveTextContent("Click me");
  });
});
