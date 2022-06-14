import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

const DiscoverVoyageur = () => {
  const navigate = useNavigate();


  const isLogged = window.localStorage.getItem("isLogged");

  return (
    <>
        <div
          style={{
            marginTop: "60px",
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
            height:"190px"
          }}>
            <h1 style={{
              fontSize: 140,
              mixBlendMode: "lighten",
              background: "white"
            }}>Le Voyageur</h1>
          </div>
          <p style={{marginLeft:"10%", marginRight:"10%"}}>
            Utilisez Le Voyageur pour planifier votre voyage comme si vos y
            Étiez déjà ! CLickez sur "access trip" pour pouvoir accéder à vos
            voyages et/ou en crée un nouveau. Notre outil vous permet d'élaborer
            votre séjour et de le suivre sur notre application mobile. Un outil
            d'organisation, d'économie et de gestion !
          </p>

          {isLogged ? (
            <Button onClick={() => navigate("/trip/list")}>My Trips</Button>
          ) : (
            <Button onClick={() => { navigate("/signin") }} >Sign in</Button>
          )}
        </div>
    </>
  );
};

export default DiscoverVoyageur;
