import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Button, ButtonType } from "..";
import { withTheme } from "../../../utils/render";
import { fireEvent } from "@testing-library/react";
import { theme } from "../../../utils/theme";
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

  test("implicitly renders the primary style", () => {
    const { getByTestId } = render(withTheme(<Button label="Click me" />));

    const styledButton = getByTestId("styledButton");

    expect(styledButton).toHaveStyle(
      `background-color: ${theme.color.green1};
      color: ${theme.color.white1};`
    );
    expect(styledButton).toMatchSnapshot();
  });

  test("explicitly renders the primary style", () => {
    const { getByTestId } = render(
      withTheme(<Button label="Click me" type={ButtonType.primary} />)
    );

    const styledButton = getByTestId("styledButton");

    expect(styledButton).toHaveStyle(
      `background-color: ${theme.color.green1};
      color: ${theme.color.white1};`
    );
    expect(styledButton).toMatchSnapshot();
  });

  test("renders secondary style", () => {
    const { getByTestId } = render(
      withTheme(<Button label="Click me" type={ButtonType.secondary} />)
    );

    const styledButton = getByTestId("styledButton");

    expect(styledButton).toHaveStyle(
      `background-color: ${theme.color.white1};
      color: ${theme.color.blue1};`
    );
    expect(styledButton).toMatchSnapshot();
  });

  test("renders tertiary style", () => {
    const { getByTestId } = render(
      withTheme(<Button label="Click me" type={ButtonType.tertiary} />)
    );

    const styledButton = getByTestId("styledButton");

    expect(styledButton).toHaveStyle(
      `background-color: ${theme.color.blue3};
      color: ${theme.color.white1};`
    );
    expect(styledButton).toMatchSnapshot();
  });

  test("renders passed label prop", () => {
    const { getByTestId } = render(withTheme(<Button label="Click me" />));

    expect(getByTestId("label")).toHaveTextContent("Click me");
  });
});
