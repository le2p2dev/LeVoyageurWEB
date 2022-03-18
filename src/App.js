import React from "react";

import { QueryClientProvider, QueryClient } from "react-query";

//import router
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";

//import components*

import Home from "./components/Home";
import BaseApp from "./components/BaseApp";
import SignIn from "./components/SignIn";
import MenuBar from "./components/MenuBar";
import DiscoverVoyageur from "./components/DiscoverVoyageur";
import TripList from "./components/trip/TripList";
import { CssBaseline } from "@mui/material";
import CreateAccount from "./components/CreateAccount";
import StepList from "./components/step/StepList";

const Main = () => {
  return (
    <>
      <CssBaseline />
      <MenuBar />
      <StepList/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/about" element={<DiscoverVoyageur />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/trip/:id" element={<BaseApp />} />
        <Route path="/trip/list" element={<TripList />} />
        <Route path="/account/create" element={<CreateAccount />} />
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
