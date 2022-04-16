import React from "react";

//import file
import VoyageurLogged from "./VoyageurLogged";
import Signin from "./SignIn";

const Home = () => {
  const isLogged = localStorage.getItem("isLogged");

  return (
    <>
      <VoyageurLogged />
    </>)

};

export default Home;
