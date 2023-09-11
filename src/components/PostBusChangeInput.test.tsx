import { fireEvent, getByTestId, render } from "@testing-library/react";

import PostBusChangeINput from "@/components/PostBusChangeInput";
import PostBusComponent from "@/components/PostBusChangeInput";
import React from "react";
import { de } from "date-fns/locale";
import { debug } from "vitest-preview";
import matchers from "@testing-library/jest-dom";

expect.extend(matchers);

describe("PostBusComponent", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(
      <PostBusComponent
        psCode=""
        setPsCode={vi.fn()}
        hsNr=""
        setHsNr={vi.fn()}
        psValid={false}
        setPsValid={vi.fn()}
        hsValid={false}
        city=""
        setCity={vi.fn()}
      />
    );
    expect(getByTestId("PostBusAddress")).toBeInTheDocument();
  });

  it("should validate the PostCode value when the user leaves the field", () => {
    const setPsValid = vi.fn();
    const { getByTestId } = render(
      <PostBusComponent
        psCode=""
        setPsCode={vi.fn()}
        hsNr=""
        setHsNr={vi.fn()}
        psValid={false}
        setPsValid={setPsValid}
        hsValid={false}
        city=""
        setCity={vi.fn()}
      />
    );
    const input = getByTestId("PostCode").querySelector("input");
    console.log(input);
    debug();
    fireEvent.change(input, {
      target: { value: "1241BW" },
    });
    fireEvent.blur(input);
    expect(setPsValid).toHaveBeenCalledWith(true);
  });
});
