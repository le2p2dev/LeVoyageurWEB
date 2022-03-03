import React, { useState, useEffect } from "react";

import TripList from "./TripList";

import LogoHeader from "../LogoHeader";

import Map from "../Map";

import { QueryClientProvider, QueryClient, useQuery } from "react-query";

import { BrowserRouter, useParams } from "react-router-dom";

//import files*

import TripInfo from "./TripInfo";
import listAPI from "../listApi";

const BaseApp = () => {
  const [lng, setLng] = useState();

  const [lat, setLat] = useState();

  const { id } = useParams();

  console.log(id);

  const { isLoading, data } = useQuery(id + "trip", () => listAPI.GetTrip(id)
  );

  if (isLoading) return "Loading..";

  const handleLngChange = (event) => {
    setLng(event.target.value);
  };

  const handleLatChange = (event) => {
    setLat(event.target.value);
  };

  return (
    <>
      <LogoHeader />
      <Map idTrip={id} />
      {data.response.map((trip) => (
        <>
          <TripInfo name={trip.tripName} desc={trip.description} id={trip.id} />
        </>
      ))}

      <TripList />
    </>
  );
};

export default BaseApp;
