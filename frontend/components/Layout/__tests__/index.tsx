import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Layout } from "..";
import { render } from "@testing-library/react";
import { withTheme } from "../../../utils/render";

describe("<Layout /> test case", () => {
  test("test ids are in the document and children are rendered", () => {
    const { getByTestId, getByRole } = render(
      withTheme(
        <Layout>
          <div>
            <span role="content">Some content</span>
          </div>
        </Layout>
      )
    );

    expect(getByTestId("layoutWrapper")).toBeInTheDocument();
    expect(getByTestId("styledLayout")).toBeInTheDocument();
    expect(getByRole("content")).toHaveTextContent("Some content");
  });
});
