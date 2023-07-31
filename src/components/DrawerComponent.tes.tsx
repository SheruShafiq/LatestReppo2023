// Import dependencies
import { render, fireEvent } from "@testing-library/react";
import DrawerComponent from "./DrawerComponent";
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
import { Provider } from "react-redux";
import { store } from "@/lib/redux/store";
expect.extend(matchers);

describe("DrawerComponent", () => {
  // Mock functions
  const setOpenMock = vi.fn();
  const isMutationMock = vi.fn();
  const setWarningActiveMock = vi.fn();

  // reset mock functions before each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders successfully", () => {
    const { getByText } = render(
      <Provider store={store}>
        <DrawerComponent
          open={true}
          setOpen={setOpenMock}
          title="Test Title"
          children="Test Child"
          isMutation={isMutationMock}
          isWarningActive={false}
          setWarningActive={setWarningActiveMock}
          inFlow={false}
        />
      </Provider>
    );

    expect(getByText("Test Title")).toBeInTheDocument();
    expect(getByText("Test Child")).toBeInTheDocument();
  });
});
