import React from "react";
import { render } from "@testing-library/react";
import Login from "../page";
import "@testing-library/jest-dom";

describe("Login", () => {
  it("renders without crashing", () => {
    const { getByText } = render(<Login />);
    expect(getByText("Login")).toBeInTheDocument();
    expect(getByText("Login")).toHaveClass(
      "MuiTypography-root",
      "MuiTypography-h5"
    );
  });
});
