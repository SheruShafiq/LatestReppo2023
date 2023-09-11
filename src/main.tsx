import "@/index.css";
import "@/lib/i18n/i18n";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/system";
import WebFont from "webfontloader";
import { createTheme } from "@mui/material";
import inter from "@/assets/fonts/inter.css";
import { store } from "@/lib/redux/store";

// WebFont.load({
//   custom: {
//     families: ["Inter"],
//     urls: [inter],
//   },
// });

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  palette: {
    primary: {
      main: "#155793",
    },
  },
  typography: {
    fontFamily: "Inter",
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>
    </LocalizationProvider>
  </BrowserRouter>
);
