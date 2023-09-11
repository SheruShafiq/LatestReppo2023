import DocumentListItem from "./ListItem";
import { debug } from "vitest-preview";
import img from "@/assets/family.jpg";
import matchers from "@testing-library/jest-dom";
import { render } from "@testing-library/react";
expect.extend(matchers);

describe("DocumentListItem", () => {
  it("renders the title and content", () => {
    const title = "Test Title";
    const content = "Test Content";
    const { getByText } = render(
      <DocumentListItem title={title} content={content} />
    );
    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(content)).toBeInTheDocument();
  });

  it("renders the image if provided", () => {
    const image = <img src={img} alt="Test Image" />;
    const { getByAltText } = render(
      <DocumentListItem
        image={image}
        title="Test Title"
        content="Test Content"
      />
    );
    debug();
    expect(getByAltText("Test Image")).toBeInTheDocument();
  });

  it("renders a placeholder image if no image is provided", () => {
    const { getByTestId } = render(
      <DocumentListItem title="Test Title" content="Test Content" />
    );
    expect(getByTestId("placeholder-image")).toBeInTheDocument();
  });
});
