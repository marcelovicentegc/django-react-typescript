import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Input } from "..";
import { render } from "@testing-library/react";
import { withTheme } from "../../../utils/render";

describe("<Input /> test case", () => {
  test("test ids are in the document", () => {
    const { getByTestId } = render(withTheme(<Input />));

    expect(getByTestId("inputWrapper")).toBeInTheDocument();
    expect(getByTestId("styledInput")).toBeInTheDocument();
  });
});
