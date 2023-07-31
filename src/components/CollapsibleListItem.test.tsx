import matchers from "@testing-library/jest-dom";
expect.extend(matchers);

import { render } from "@testing-library/react";
import {
  CollapsibleListItemProps,
  CollapsibleListItem,
} from "../components/CollapsibleListItem";
import { debug } from "vitest-preview";

describe("FAQListItem", () => {
  const defaultProps: CollapsibleListItemProps = {
    title: "Test question",
    content: "Test answer",
  };

  it("renders the question and answer correctly", async () => {
    const { getByText } = await render(
      <CollapsibleListItem {...defaultProps} />
    );

    expect(getByText(defaultProps.title)).toBeInTheDocument();
    expect(getByText(defaultProps.content)).toBeInTheDocument();
  });

  it("expands and collapses the accordion", async () => {
    const { getByText, getByRole } = await render(
      <CollapsibleListItem {...defaultProps} />
    );
    const summary = getByRole("button");
    expect(getByText(defaultProps.content)).not.toBeVisible();

    summary.click();
    expect(getByText(defaultProps.content)).not.toHaveStyle("display: none");

    debug();
    summary.click();
    expect(getByText(defaultProps.content)).not.toBeVisible();
    expect(screen).toMatchSnapshot();
  });
});
