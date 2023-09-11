import { test } from "vitest";
import { render, fireEvent, getByText, getByTestId } from "@testing-library/react";
import GenericInputField from "../components/GenericInputField";
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
expect.extend(matchers);

describe("GenericInputField", () => {
  it("renders input field with provided label", async () => {
    const { getByLabelText } = render(
      <GenericInputField label="Test Label" value="" onChange={() => {}} />
    );

    const input = getByLabelText("Test Label");
    expect(input).toBeInTheDocument();
  });

  it("triggers onChange event when input value changes", async () => {
    const handleChange = vi.fn();
    const { getByLabelText } = render(
      <GenericInputField label="Test Label" value="" onChange={handleChange} />
    );
    const input = getByLabelText("Test Label");
    await fireEvent.change(input, { target: { value: "Test Value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("renders input field with error state if error prop is true", async () => {
    render(<GenericInputField label="Test Label" value="" onChange={() => {}} error={true} />);

 debug();
    const input = document.querySelector("label");
    expect(input).toHaveStyle("color: #d32f2f");
  });
});
