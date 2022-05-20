import React, { useState } from "react";
import TripList from "./trip/TripList";
import { useNavigate } from "react-router-dom";

import imageBG from "../assets/voyage.jpeg";

//mui imports
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { CssBaseline, Grid, Paper } from "@mui/material";
import { Box } from "@mui/system";

const DiscoverVoyageur = () => {
  const navigate = useNavigate();

  const [number, setNumber] = useState(0);
  const name = ["Bonjour", "Hola", "Guten tag", "Wilkommen", "Nǐn hǎo"];

  const isLogged = window.localStorage.getItem("isLogged");

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundImage: `url(https://i.pinimg.com/originals/1f/3e/e8/1f3ee8d02c84a3a08ceb973bf90895bc.gif)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "90vh",
        }}
      >
        <div
          style={{
            height: "90vh",
            width: "40vw",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            paddingLeft: "10px",
          }}
        >
          <h1>Le Voyageur</h1>
          <p>
            Utilisez Le Voyageur pour planifier votre voyage comme si vos y
            Étiez déjà ! CLickez sur "access trip" pour pouvoir accéder à vos
            voyages et/ou en crée un nouveau. Notre outil vous permet d'élaborer
            votre séjour et de le suivre sur notre application mobile. Un outil
            d'organisation, d'économie et de gestion !
          </p>

          {isLogged ? (
            <Button onClick={() => navigate("/trip/list")}> access trip</Button>
          ) : (
            <Button
              onClick={() => {
                navigate("/signin");
              }}
            >
              Connexion
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default DiscoverVoyageur;
