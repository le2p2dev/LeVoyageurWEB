import React from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { QueryClientProvider, QueryClient } from "react-query";

//import router
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

//import components*

import Home from "./components/Home";
import BaseApp from "./components/BaseApp";
import SignIn from "./components/SignIn";

const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route exact path="/signin" element={<SignIn />} />

        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/trip/:id" element={<BaseApp />} />
      </Routes>
    </>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <HashRouter>
      <QueryClientProvider client={queryClient}>
        <Main style={{ margin: 0 }} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </HashRouter>
  );
};

export default App;
