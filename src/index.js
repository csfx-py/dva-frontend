import { SnackbarProvider } from "notistack";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { LoadingProvider } from "./Contexts/LoadingContext";
import { UserProvider } from "./Contexts/UserContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <LoadingProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </LoadingProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </React.StrictMode>
);
