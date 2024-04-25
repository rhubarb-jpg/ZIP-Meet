import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContextProvider from "./context/UserContext";

import "./custom.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserContextProvider>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </UserContextProvider>
  </BrowserRouter>
);
