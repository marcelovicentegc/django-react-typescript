import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Card } from "..";
import { fireEvent } from "@testing-library/react";
import { render } from "@testing-library/react";
import { withTheme } from "../../../utils/render";

const leftClick = { button: 1 };

describe("<Card /> test case", () => {
  test("test ids are in the document", () => {
    const { getByTestId, queryByTestId } = render(withTheme(<Card />));

    expect(getByTestId("cardWrapper")).toBeInTheDocument();
    expect(getByTestId("styledCard")).toBeInTheDocument();
    expect(queryByTestId("title")).toBeNull();
  });

  test("renders passed title prop with no function associated with it", () => {
    const { getByTestId } = render(
      withTheme(<Card withTitle={{ title: "Unit tests" }} />)
    );

    expect(getByTestId("title")).toBeInTheDocument();
    expect(getByTestId("title")).toHaveTextContent("Unit tests");
    expect(fireEvent.click(getByTestId("title"), leftClick)).toBeTruthy();
  });

  test("renders passed title prop with a function associated with it", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      withTheme(
        <Card withTitle={{ title: "Unit tests", withFunction: onClick }} />
      )
    );

    expect(getByTestId("title")).toHaveTextContent("Unit tests");
    fireEvent.click(getByTestId("title"), leftClick);
    expect(onClick).toHaveBeenCalled();
  });

  test("renders passed children prop", () => {
    const { container } = render(
      withTheme(
        <Card>
          <div>
            <span>We are the children! 🚸</span>
          </div>
        </Card>
      )
    );

    expect(container).toContainHTML(
      "<div><span>We are the children! 🚸</span></div>"
    );
  });

  test("card's title is hoverable", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      withTheme(
        <Card withTitle={{ title: "Unit tests", withFunction: onClick }} />
      )
    );

    expect(getByTestId("title")).toHaveStyle("cursor: pointer");
  });

  test("card's title is not hoverable", () => {
    const { getByTestId } = render(
      withTheme(<Card withTitle={{ title: "Unit tests" }} />)
    );

    expect(getByTestId("title")).toHaveStyle("cursor: default");
  });
});
