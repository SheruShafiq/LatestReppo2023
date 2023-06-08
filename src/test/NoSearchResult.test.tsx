// src/components/__tests__/NoSearchResult.test.js
import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import NoSearchResult from "../components/NoSearchResult";
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
expect.extend(matchers);

test("renders NoSearchResult component", () => {
  const { getByRole, getByText } = render(<NoSearchResult />);
    debug();
  // Check for the image
  const image = getByRole("img");
  expect(image).toBeInTheDocument();
  expect(image.src).toContain("undraw_searching.svg");
  expect(image.style.width).toEqual("268px");

  // Check for the first Typography element
  const title = getByText("Helaas geen resultaat");
  expect(title).toBeInTheDocument();
  expect(title.tagName).toEqual("H1");
  expect(title).toHaveStyle("color: #1A202C");
  expect(title).toHaveStyle("font-weight: 600");
  expect(title).toHaveStyle("font-size: 24px");
  expect(title).toHaveStyle("line-height: 32px");

  // Check for the second Typography element
  const description = getByText(
    "We konden geen klanten vinden op basis van de opgegeven zoekwoorden."
  );
  expect(description).toBeInTheDocument();
  expect(description.tagName).toEqual("P");
  expect(description).toHaveStyle("color: #6C737F");
});
