import React, { useState, useEffect } from "react";
import TripList from "./TripList";

const Home = () => {
  return (
    <>
      <h1>Welcome chez le voyageur</h1>
      <a href="/signin"> Connect </a>
      <TripList />
      <h2>Create a new trip</h2>
    </>
  );
};

export default Home;
