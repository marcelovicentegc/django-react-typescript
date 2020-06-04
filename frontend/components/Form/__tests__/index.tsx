import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { Form } from "..";
import { render } from "@testing-library/react";
import { withTheme } from "../../../utils/render";

const inputs = [
  {
    type: "text",
    onChange: jest.fn(),
    placeholder: "this is a tip 1",
    value: ""
  },
  {
    type: "text",
    onChange: jest.fn(),
    placeholder: "this is a tip 2",
    value: ""
  },
  {
    type: "text",
    onChange: jest.fn(),
    placeholder: "this is a tip 3",
    value: ""
  }
];

describe("<Form /> test case", () => {
  test("test ids are in the document", () => {
    const { getByTestId } = render(withTheme(<Form inputs={inputs} />));

    expect(getByTestId("formWrapper")).toBeInTheDocument();
    expect(getByTestId("styledForm")).toBeInTheDocument();
    const inputElements = document.getElementsByTagName("input");
    expect(inputElements).toHaveLength(3);
  });
});
