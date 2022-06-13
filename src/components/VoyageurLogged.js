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
            height: "90vh",
            width: "100vw",
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{
            backgroundImage:  `url(https://i.ibb.co/ZWcyMpt/backdrop.gif)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            height:"35vh"
          }}>
            <h1 style={{
              fontSize: 180,
              mixBlendMode: "lighten",
              background: "white"
            }}>Le Voyageur</h1>
          </div>
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
    </>
  );
};

export default DiscoverVoyageur;
