import { render, screen } from "@testing-library/react";
import { debug } from "vitest-preview";
import { Provider } from "react-redux";
import { store } from "../lib/redux/store";
import NavigationMenu from "../components/NavigationMenu";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import sessionSlice from "../lib/redux/slices/sessionSlice";
import layoutSlice from "../lib/redux/slices/layoutSlice";
import { fireEvent } from "@testing-library/react";
import matchers from "@testing-library/jest-dom";
expect.extend(matchers);

const mockStore = configureStore({
  reducer: { session: sessionSlice, layout: layoutSlice },

  preloadedState: {
    session: {
      permissions: [
        "user-management",
        "portfolio-management",
        "news-management",
      ],

      initialised: false,
      active: false,
      csrf: "",
      expiresAt: null,
      user: {
        username: "",
        firstName: "",
        lastName: "",
      },
    },

    layout: {
      drawerOpen: false,
      accountMenuOpen: false,
      policyDetailDrawerOpen: false,
    },
  },
});

describe("NavMenuDrawer", () => {
  it("renders the drawer correctly", async () => {
    const { getByTestId } = await render(
      <Provider store={store}>
        <BrowserRouter>
          <NavigationMenu></NavigationMenu>
        </BrowserRouter>
      </Provider>
    );

    // Tets if the Drawer is rendered correctly
    const Drawer = getByTestId("NavMenuDrawer");
    expect(Drawer).toBeDefined();
  });

  it("tests if only the permissions that are granted are being rendered", async () => {
    const { getByTestId } = await render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NavigationMenu></NavigationMenu>
        </BrowserRouter>
      </Provider>
    );

    const userManagement = getByTestId("dashboard");
    expect(userManagement).toBeDefined();

    const portfolio = screen.queryByTestId("portfolio");
    expect(portfolio).toBeDefined();

    const marketing = screen.queryByTestId("marketing");
    expect(marketing).toBeNull();
  });

  it("Navigates you to a new URL on click", async () => {
    const { getByTestId } = await render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NavigationMenu></NavigationMenu>
        </BrowserRouter>
      </Provider>
    );

    const portfolio = getByTestId("portfolio");
    await fireEvent.click(portfolio);
    expect(global.window.location.pathname).toContain("/portfolio");
  });

  it("Stays Highlighted after navigation", async () => {
    // Set initial window.location.href
    Object.defineProperty(window, "location", {
      value: {
        href: "http://localhost",
      },
      writable: true,
    });

    const { getByTestId, findByTestId } = render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <NavigationMenu></NavigationMenu>
        </BrowserRouter>
      </Provider>
    );

    const portfolio = getByTestId("portfolio");
    fireEvent.click(portfolio);

    // Update window.location.href after the click
    window.location.href = "http://localhost:8080/portfolio/1";
    // expect(window.location.href).toContain("5");
    const updatedPortfolio = await findByTestId("portfolio");
    debug();
    expect(updatedPortfolio).toHaveStyle("background-color: #E4EAF2");
  });
});
