import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import PostBusChangeINput from "@/components/PostBusChangeInput";
import matchers from "@testing-library/jest-dom";
import { de } from "date-fns/locale";
import { debug } from "vitest-preview";
expect.extend(matchers);

describe("PostBusChangeINput", () => {
  it("should render without throwing an error", () => {
    const { getByTestId } = render(
      <PostBusChangeINput
        psCode={""}
        setPsCode={vi.fn()}
        hsNr={""}
        setHsNr={vi.fn()}
        psValid={false}
        setPsValid={vi.fn()}
        hsValid={false}
        city={""}
        setCity={vi.fn()}
      />
    );
    expect(getByTestId("PostBusAddress")).toBeInTheDocument();
  });

  it("should display the correct initial value based on props", () => {
    const data = { city: "Seattle" };
    const { getByTestId } = render(
      <PostBusChangeINput
        psCode={"12345"}
        setPsCode={vi.fn()}
        hsNr={"54321"}
        setHsNr={vi.fn()}
        psValid={false}
        setPsValid={vi.fn()}
        hsValid={false}
        city={"Seattle"}
        setCity={vi.fn()}
      />
    );
    const postcodeField = getByTestId("PostCode");
    const postbusnummerField = getByTestId("Postbusnummer");
    debug();
    expect(postcodeField).toHaveProperty("value");
    expect(postbusnummerField.value).toBe("54321");
  });
});
