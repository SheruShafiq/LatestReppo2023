// Import dependencies
import { fireEvent, getByTestId, render } from "@testing-library/react";

import DrawerComponent from "./DrawerComponent";
import { Provider } from "react-redux";
import matchers from "@testing-library/jest-dom";
import { store } from "@/lib/redux/store";

expect.extend(matchers);

describe("DrawerComponent", () => {
  const setOpenMock = vi.fn();
  const isMutationMock = vi.fn();
  const setWarningActiveMock = vi.fn();

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

  test("calls setOpen when close button is clicked", () => {
    const { getByTestId } = render(
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

    fireEvent.click(getByTestId("close"));

    expect(setOpenMock).toHaveBeenCalled();
  });

  test("calls isMutation when close button is clicked", () => {
    const { getByTestId } = render(
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

    fireEvent.click(getByTestId("close"));

    expect(isMutationMock).toHaveBeenCalledWith("default");
  });

  test("calls setWarningActive when stepper is active and close button is clicked", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <DrawerComponent
          open={true}
          setOpen={setOpenMock}
          title="Test Title"
          children="Test Child"
          isMutation={isMutationMock}
          isWarningActive={false}
          setWarningActive={setWarningActiveMock}
          inFlow={true}
        />
      </Provider>
    );

    fireEvent.click(getByTestId("close"));

    expect(setWarningActiveMock).toHaveBeenCalledWith(true);
  });

  test("calls setWarningActive when isWarningActive is true and close button is clicked", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <DrawerComponent
          open={true}
          setOpen={setOpenMock}
          title="Test Title"
          children="Test Child"
          isMutation={isMutationMock}
          isWarningActive={true}
          setWarningActive={setWarningActiveMock}
          inFlow={false}
        />
      </Provider>
    );

    fireEvent.click(getByTestId("close"));

    expect(setWarningActiveMock).toHaveBeenCalledWith(false);
  });

  test("calls setOpen when stepper is not active and isWarningActive is false and close button is clicked", () => {
    const { getByTestId } = render(
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

    fireEvent.click(getByTestId("close"));

    expect(setOpenMock).toHaveBeenCalledWith(false);
  });
});
