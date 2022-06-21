import React from "react";

import { QueryClientProvider, QueryClient } from "react-query";

//import router
import { Routes, Route, HashRouter, Navigate } from "react-router-dom";

//import components*

import VoyageurLogged from "./components/VoyageurLogged";
import BaseApp from "./components/BaseApp";
import SignIn from "./components/SignIn";
import MenuBar from "./components/MenuBar";
import TripList from "./components/trip/TripList";
import { CssBaseline } from "@mui/material";
import CreateAccount from "./components/CreateAccount";
import Profile from "./Profile";

const Main = () => {
  return (
    <>
      <CssBaseline />
      <MenuBar />
      <Routes>
        <Route path="/" element={<VoyageurLogged />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/account" element={<Profile />} />
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
      </QueryClientProvider>
    </HashRouter>
  );
};

export default App;
