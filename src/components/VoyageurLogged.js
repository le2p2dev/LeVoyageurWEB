import React from "react";
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}>
            <img alt="Logo full" src="https://i.ibb.co/S79TwfP/full.png"></img>
          </div>
          <p style={{textAlign:"center"}}>
            LeVoyageur App lets you plan your next trip as if you were already there !
            <br/>Create an account then click My Trips below to create your next trip.
            <br/>You will then be able to share, plan, add files and follow the trip on your smartphone ! 
          </p>

          {isLogged ? (
            <Button onClick={() => navigate("/trip/list")}>My Trips</Button>
          ) : (
            <Button onClick={() => { navigate("/signin") }} >Sign in</Button>
          )}
        </div>
        <a style={{justifyContent : "center", display : 'flex', height : 150, marginTop: 60}} href="https://docs.google.com/uc?export=download&id=18A_prhcafbZVPStQ0MzDv4qzupmJxtRg"><img alt="appli mobile" target="_blank" src="https://guide-images.cdn.ifixit.com/igi/hAgr2LwD6AECIwsh.large"></img></a>

    </>
  );
};

export default DiscoverVoyageur;