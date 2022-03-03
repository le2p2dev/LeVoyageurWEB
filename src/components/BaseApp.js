import React, { useState, useEffect } from "react";

import TripList from "./TripList";

import LogoHeader from "../LogoHeader";

import Map from "../Map";

import { QueryClientProvider, QueryClient, useQuery } from "react-query";

import { BrowserRouter, useParams } from "react-router-dom";

//import files*

import TripInfo from "./TripInfo";

const BaseApp = () => {
  const [lng, setLng] = useState();

  const [lat, setLat] = useState();

  const { id } = useParams();

  console.log(id);

  const { isLoading, data } = useQuery(id + "trip", () =>
    fetch(`http://mc.outronic.fr:3630/api/trip/find?id=${id}`).then((res) =>
      res.json()
    )
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
      <Map />
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
