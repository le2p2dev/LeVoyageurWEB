import React, { useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Map from "./Map";

import LogoHeader from "./LogoHeader";
import TripList from "./components/TripList";
import { QueryClientProvider, QueryClient } from "react-query";
import MarkerList from "./components/MarkerList";
import listAPI from "./listApi";

const Main = () => {
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();

  const handleLngChange = (event) => {
    setLng(event.target.value);
  };
  const handleLatChange = (event) => {
    setLat(event.target.value);
  };
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LogoHeader />
      <Map />
      <TripList />
    </QueryClientProvider>
  );
};

const App = () => (
  <>
    <Main style={{ margin: 0 }} />
  </>
);

export default App;
