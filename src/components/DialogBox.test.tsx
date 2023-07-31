// Require React Testing Library dependencies
import { render, fireEvent } from "@testing-library/react";
import DialogBox from "./DialogBox";
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
expect.extend(matchers);

describe("DialogBox Component", () => {
  it("renders successfully", () => {
    const { getByText } = render(
      <DialogBox
        title="test title"
        description="test description"
        onContinue={vi.fn()}
        onTerminate={vi.fn()}
        open={true}
      />
    );

    expect(getByText("test title")).toBeTruthy();
    expect(getByText("test description")).toBeTruthy();
  });

  it("renders title and description correctly", () => {
    const { getByText } = render(
      <DialogBox
        title="test title"
        description="test description"
        onContinue={vi.fn()}
        onTerminate={vi.fn()}
        open={true}
      />
    );

    expect(getByText("test title")).toBeInTheDocument();
    expect(getByText("test description")).toBeInTheDocument();
  });

  it("onContinue is called on button click", () => {
    const onContinueMock = vi.fn();

    const { getByText } = render(
      <DialogBox
        title="test title"
        description="test description"
        onContinue={onContinueMock}
        onTerminate={() => {}}
        open={true}
      />
    );

    fireEvent.click(getByText("Annuleren"));
    expect(onContinueMock).toHaveBeenCalledTimes(1);
  });

  it("onTerminate is called when Terminate button is clicked", () => {
    const onTerminateMock = vi.fn();

    const { getByText } = render(
      <DialogBox
        open={true}
        title="test title"
        description="test description"
        onContinue={() => {}}
        onTerminate={onTerminateMock}
      />
    );

    fireEvent.click(getByText("Beëindigen"));
    expect(onTerminateMock).toHaveBeenCalledTimes(1);
  });

  it("renders Terminate button text correctly", () => {
    // Default text
    let { getByText } = render(
      <DialogBox
        title="test title"
        description="test description"
        onContinue={vi.fn()}
        onTerminate={vi.fn()}
        open={true}
      />
    );

    expect(getByText("Beëindigen")).toBeInTheDocument();

    // Custom text
    render(
      <DialogBox
        open={true}
        title="test title"
        description="test description"
        onContinue={vi.fn()}
        onTerminate={vi.fn()}
        confirmButtonText="custom text"
      />
    );

    expect(getByText("custom text")).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});
