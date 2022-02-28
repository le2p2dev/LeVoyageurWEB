import React, { useState } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Map from "./Map";

import LogoHeader from "./LogoHeader";
import TripList from "./components/TripList";
import { QueryClientProvider, QueryClient, useQuery } from "react-query";
import MarkerList from "./components/MarkerList";
import listAPI from "./listApi";
import { useParams } from "react-router-dom";

const Main = () => {
  const [lng, setLng] = useState();
  const [lat, setLat] = useState();

  const { id } = useParams();
  console.log(id);

  const { isLoading, data } = useQuery(id + "trip", () => {
    listAPI.GetTrip(id);
  });

  const handleLngChange = (event) => {
    setLng(event.target.value);
  };
  const handleLatChange = (event) => {
    setLat(event.target.value);
  };
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {isLoading ? "Loading.." : "done"}
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
