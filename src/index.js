import React from "react";
import ReactDOM from "react-dom";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApiProvider } from "./api.js";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import Home from "./components/Home.js";
import SignIn from "./SignIn.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0, // 5000
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route path="/hello" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
