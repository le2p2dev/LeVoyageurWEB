import React, { useState } from "react";

import mapboxgl from "mapbox-gl";

import Map from "./Map";

import TripInfo from "./components/TripInfo.js";

import LogoHeader from "./LogoHeader";

import TripList from "./components/TripList";

import { QueryClientProvider, QueryClient, useQuery } from "react-query";

import MarkerList from "./components/MarkerList";

import listAPI from "./listApi";

import { BrowserRouter, useParams } from "react-router-dom";

import BaseApp from "./components/BaseApp";

//import router

import { Routes, Route, HashRouter, Navigate } from "react-router-dom";

import { ReactQueryDevtools } from "react-query/devtools";

//import components*

import Home from "./components/Home";

import SignIn from "./SignIn";

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
        <Main />

        <ReactQueryDevtools />
      </QueryClientProvider>
    </HashRouter>
  );
};

export default App;
