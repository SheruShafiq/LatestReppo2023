// Import dependencies
import { render, fireEvent } from "@testing-library/react";
import IbanInput from "./IbanInput";
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
expect.extend(matchers);

describe("IbanInput", () => {
  const changeMock = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("renders successfully", () => {
    const { getByLabelText } = render(
      <IbanInput value="Test Iban" change={changeMock} />
    );
    expect(getByLabelText("IBAN")).toBeInTheDocument();
  });

  it("should call the passed change function on input change", async () => {
    const { getByLabelText } = render(
      <IbanInput value="Test Iban" change={changeMock} />
    );
    const ibanInput = getByLabelText("IBAN") as HTMLInputElement;
    await fireEvent.input(ibanInput, { target: { value: "New Test Iban" } });
    expect(changeMock).toHaveBeenCalled();
  });

  it("should validate the iban on blur", async () => {
    const { getByLabelText } = render(
      <IbanInput value="NL68INGB06709910dd588" change={changeMock} />
    );

    const ibanInput = getByLabelText("IBAN") as HTMLInputElement;

    const label = getByLabelText("IBAN").parentElement;

    await fireEvent.blur(ibanInput);
    debug();
    expect(label).toHaveClass("Mui-error");
  });

  it("should not set error for valid IBAN", async () => {
    // Here, input a valid IBAN string
    const { getByLabelText } = render(
      <IbanInput value="NL68INGB0670991058" change={changeMock} />
    );
    const ibanInput = getByLabelText("IBAN") as HTMLInputElement;

    // Trigger the onBlur event
    await fireEvent.blur(ibanInput);

    // Expect the input to not have error
    const label = getByLabelText("IBAN").parentElement;

    expect(label).not.toHaveClass("Mui-error");
    expect(screen).toMatchSnapshot();
  });
});
