import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AddressChangeInput from "./AddressChangeInput";
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
import { de } from "date-fns/locale";
expect.extend(matchers);

describe("AddressChangeInput", () => {
  const mockSetPsCode = vi.fn();
  const mockSetHsNr = vi.fn();
  const mockSetAddition = vi.fn();

  beforeEach(() => {
    render(
      <AddressChangeInput
        psCode="2031WL"
        setPsCode={mockSetPsCode}
        hsNr="1"
        setHsNr={mockSetHsNr}
        addition=""
        setAddition={mockSetAddition}
        hsValid={false}
      />
    );
  });

  it("renders all input fields", () => {
    debug();
    expect(screen.getByLabelText("Postcode")).toBeInTheDocument();
    expect(screen.getByLabelText("Huisnummer")).toBeInTheDocument();
    expect(screen.getByTestId("addition")).toBeInTheDocument();
    expect(screen.getByLabelText("Straatnaam")).toBeInTheDocument();
    expect(screen.getByLabelText("Woonplaats")).toBeInTheDocument();
  });

  it("updates psCode when changed", () => {
    fireEvent.change(screen.getByLabelText("Postcode"), {
      target: { value: "1234 AB" },
    });
    expect(mockSetPsCode).toHaveBeenCalledWith("1234 AB");
  });

  it("updates hsNr when changed", () => {
    fireEvent.change(screen.getByLabelText("Huisnummer"), {
      target: { value: "12" },
    });
    expect(mockSetHsNr).toHaveBeenCalledWith("12");
  });

  it("validates psCode on blur", async () => {
    fireEvent.blur(screen.getByLabelText("Postcode"));
    await waitFor(() => expect(mockSetPsCode).toHaveBeenCalled());
    expect(screen).toMatchSnapshot();
  });
});
