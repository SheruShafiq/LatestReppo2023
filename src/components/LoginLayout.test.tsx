import React from "react";
import { render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
import LoginLayout from "../components/LoginLayout";
expect.extend(matchers);

describe("LoginLayout", () => {
  it("renders its children correctly", async () => {
    const children = <div data-testid="child-element">Child</div>;
    const { getByTestId } = await render(<LoginLayout>{children}</LoginLayout>);

    const childElement = getByTestId("child-element");
    expect(childElement).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});
