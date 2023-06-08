import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import sessionSlice, { selectSessionCsrf } from "../lib/redux/slices/sessionSlice";
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
import LoginButton from "../components/LoginButton";
import { useAppSelector } from "../lib/hooks/useAppSelector";
import { store } from "../lib/redux/store";
import useSessionInit from "../lib/hooks/useSessionInit";
expect.extend(matchers);


const mockStore = configureStore({
  reducer: { session: sessionSlice },
  preloadedState: {
    session: {
      csrf: "test-csrf-token",
    },
  },
});

describe("LoginButton", () => {
  beforeEach(() => {
    render(
      <Provider store={mockStore}>
        <LoginButton />
      </Provider>
    );
  });

  it("renders the button with correct text and styles", () => {
    const button = screen.getByRole("button", { name: /INLOGGEN MET/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle({
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "270px",
      height: "37px",
      color: "#3C4653",
      borderColor: "#3C4653",
    });
  });

  it("renders the eHerkenning logo", () => {
    const logo = screen.getByRole("img");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveStyle({
      position: "relative",
      top: "2px",
      width: "117px",
      height: "auto",
      scale: "1.2",
    });
  });

//   it("renders the form with correct action, method, and CSRF token", () => {
//     const form = screen.getByTestId("form");
//     expect(form).toHaveAttribute("action", "/api/auth/developer");
//     expect(form).toHaveAttribute("method", "post");

//     const csrfTokenInput = store.getState().session.csrf;
//     expect(csrfTokenInput).toBeTruthy();
//   });

//TODO: fix this test
//   it("submits the form", () => {
//     const form = screen.getByTestId("form");
//     const submitSpy = vi.spyOn(form, "click");

//     const button = screen.getByTestId("button");
//     fireEvent.click(button);

//     expect(submitSpy).toHaveBeenCalled();
//     vi.restoreAllMocks();
//   });
});
