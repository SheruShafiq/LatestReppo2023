import NavigationButtons, { NavigationButtonsProps } from "./NavigationButtons";
import { fireEvent, render, screen } from "@testing-library/react";

import matchers from "@testing-library/jest-dom";

expect.extend(matchers);

describe("NavigationButtons", () => {
  const mockHandleBack = vi.fn();
  const mockHandleNext = vi.fn();
  const mockSetLoading = vi.fn();

  const defaultProps: NavigationButtonsProps = {
    handleNext: mockHandleNext,
    handleBack: mockHandleBack,
    disabled: false,
    backText: "Previous",
    nextText: "Next",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders without crashing", () => {
    render(<NavigationButtons {...defaultProps} />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("calls handleBack when back button is clicked", () => {
    render(<NavigationButtons {...defaultProps} />);
    fireEvent.click(screen.getByText("Previous"));
    expect(mockHandleBack).toHaveBeenCalledTimes(1);
  });

  it("calls handleNext when next button is clicked and isLast is false", () => {
    render(<NavigationButtons {...defaultProps} />);
    fireEvent.click(screen.getByText("Next"));
    expect(mockHandleNext).toHaveBeenCalledTimes(1);
  });

  it("shows LoadingButton and sets loading when next button is clicked and isLast is true", async () => {
    render(
      <NavigationButtons
        {...defaultProps}
        isLast={true}
        setLoading={mockSetLoading}
      />
    );

    fireEvent.click(screen.getByText("Next"));
    expect(mockSetLoading).toHaveBeenCalledWith(true);
  });
});
