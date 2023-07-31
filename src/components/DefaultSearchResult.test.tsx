import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import DefaultSearchResult from "../components/DefaultSearchResult";
import matchers from "@testing-library/jest-dom";
import { debug } from "vitest-preview";
expect.extend(matchers);

test("renders DefaultSearchResult component correctly", () => {
  const theme = createTheme();
  const { getByText, getByAltText } = render(
    <ThemeProvider theme={theme}>
      <DefaultSearchResult />
    </ThemeProvider>
  );

  const imgElement = getByAltText("");
  expect(imgElement).toBeInTheDocument();
  expect(imgElement.src).toContain("undraw_search.svg");
  expect(imgElement.style.width).toBe("215px");

  const titleElement = getByText("Zoek binnen uw portefeuille");
  expect(titleElement).toBeInTheDocument();
  expect(titleElement.tagName).toBe("H1");

  expect(titleElement).toHaveStyle('text-align: center')
  expect(titleElement).toHaveStyle('margin-top: 2rem')

  const subtitleElement = getByText("Gebruik de zoekfunctie om klanten te vinden in uw portefeuille");
  expect(subtitleElement).toBeInTheDocument();
  expect(subtitleElement.tagName).toBe("P");
  expect(subtitleElement).toHaveStyle('text-align: center')
  expect(subtitleElement).toHaveStyle('margin-top: 1rem')
  expect(subtitleElement).toHaveStyle('margin-bottom: 2rem')
  expect(screen).toMatchSnapshot();
});
