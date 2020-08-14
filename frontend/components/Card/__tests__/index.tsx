import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Card } from "..";
import { render } from "@testing-library/react";
import { withTheme } from "../../../utils/render";

describe("<Card /> test case", () => {
  test("test ids are in the document", () => {
    const { getByTestId, queryByTestId } = render(withTheme(<Card />));

    expect(getByTestId("cardWrapper")).toBeInTheDocument();
    expect(getByTestId("styledCard")).toBeInTheDocument();
    expect(queryByTestId("title")).toBeNull();
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
});
