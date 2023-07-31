import ButtonAppBar from "../components/Header";
import { fireEvent, render } from "@testing-library/react";
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
expect.extend(matchers);
import useResizeHandler from "../lib/hooks/useResizeHandler";
import { Provider } from "react-redux";
import { store } from "../lib/redux/store";

describe("ButtonAppBar", () => {
  it("renders the component correctly", async () => {
    render(
      <Provider store={store}>
        <ButtonAppBar />
      </Provider>
    );

    debug();
    expect(document.getElementById("headerBox")).toBeInTheDocument();
    expect(document.getElementById("headerAppBar")).toBeInTheDocument();
  });

  it("toggles the drawer state when menu button is clicked", async () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <ButtonAppBar />
      </Provider>
    );

    const menuButton = getByLabelText("menu");
    await fireEvent.click(menuButton);

    // Verify that the drawer state has changed (e.g., by checking if a CSS class or an attribute has been added/removed)
  });

  it("toggles the account menu state when account button is clicked", async () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <ButtonAppBar />
      </Provider>
    );

    const accountButton = getByLabelText("account");
    await fireEvent.click(accountButton);

    // Verify that the account menu state has changed (e.g., by checking if a CSS class or an attribute has been added/removed)
  });

  it("renders the menu button when the viewport width is less than or equal to 900", async () => {
    // Mock the useResizeHandler hook to return a width of 900 or less
    const { getByLabelText } = render(
      <Provider store={store}>
        <ButtonAppBar />
      </Provider>
    );

    const menuButton = getByLabelText("menu");
    expect(menuButton).toBeInTheDocument();
    expect(screen).toMatchSnapshot();
  });
});
