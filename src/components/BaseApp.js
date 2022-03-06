import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

//import files*

import TripInfo from "./trip/TripInfo";
import listAPI from "../api/listApi";
import TripList from "./trip/TripList";
import LogoHeader from "./LogoHeader";
import Map from "./map/Map";

const BaseApp = () => {
  const { id } = useParams();

  console.log(id);

  const { isLoading, data } = useQuery(id + "trip", () => listAPI.GetTrip(id));

  if (isLoading) return "Loading..";

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
