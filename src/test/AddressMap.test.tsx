import React from "react";
import { debug } from "vitest-preview";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddressMap, { AddressMapProps } from "../components/AddressMap";

import matchers from "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "../lib/redux/store";
import { de } from "date-fns/locale";
expect.extend(matchers);

describe("AddressMap", () => {
  const defaultProps: AddressMapProps = {
    postalCode: "1221HE",
    houseNumber: "5",
  };

  beforeEach(() => {
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            latitude: "37.4219999",
            longitude: "-122.0840575",
          }),
      })
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it("renders loading state", () => {
    render(
      <Provider store={store}>
        <AddressMap {...defaultProps} />
      </Provider>
    );
    const loadingElement = document.getElementById("map-skeleton");
    expect(loadingElement).toBeInTheDocument();
  });

  it("renders map container and marker after fetching location data", async () => {
    render(
      <Provider store={store}>
        <AddressMap {...defaultProps} />
      </Provider>
    );
    await waitForElementToBeRemoved(() =>
      document.getElementById("map-skeleton")
    );
    const mapContainer = document.getElementById("map-container");
    const mapMarker = document.getElementById("map-marker");
    debug();
    expect(mapContainer).toBeInTheDocument();
  });

  it("renders generic fallback when an error occurs", async () => {
    global.fetch = vi.fn().mockImplementation(() => Promise.reject());
    render(
      <Provider store={store}>
        <AddressMap {...defaultProps} />
      </Provider>
    );
    await waitForElementToBeRemoved(() =>
      document.getElementById("map-skeleton")
    );

    const errorElement = screen.getByText(/Failed to fetch location data./i);
    expect(errorElement).toBeInTheDocument();
  });

  it("renders generic fallback when no location data is returned", async () => {
    global.fetch = vi.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );
    render(
      <Provider store={store}>
        <AddressMap {...defaultProps} />
      </Provider>
    );

    await waitForElementToBeRemoved(() =>
      document.getElementById("map-skeleton")
    );

    const errorElement = screen.getByText(/Invalid Address./i);
    expect(errorElement).toBeInTheDocument();
  });

  it("renders nothing when no address is provided", () => {
    render(
      <Provider store={store}>
        <AddressMap postalCode={""} houseNumber={""} />
      </Provider>
    );
    const mapContainer = document.getElementById("map-container");
    expect(mapContainer).not.toBeInTheDocument();
  });
});
