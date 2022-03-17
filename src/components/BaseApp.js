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



  const { isLoading, data } = useQuery(id + "trip", () => listAPI.GetTrip(id));

  if (isLoading) return "Loading..";

  return (
    <>
      <LogoHeader />

      <TripInfo
        name={data.response[0].title}
        desc={data.response[0].description}
        id={data.response[0].id}
      />

      <Map idTrip={id} />
    </>
  );
};

export default BaseApp;
