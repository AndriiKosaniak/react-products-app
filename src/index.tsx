import React from "react";
import ReactDOM from "react-dom/client";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "@mui/material/styles/ThemeProvider";

import App from "./App";
import { productsApi } from "api";
import { theme } from "theme";

import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApiProvider api={productsApi}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ApiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
