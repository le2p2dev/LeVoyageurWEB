import React from "react";
import TripList from "./trip/TripList";
import { useNavigate } from "react-router-dom";

//mui imports
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const DiscoverVoyageur = () => {
  const navigate = useNavigate();

  const username = window.localStorage.getItem("username");

  return (
    <>
      <h1>Bonjour {username} </h1>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => navigate("/trip/list")}>
          Mes voyages
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            navigate("/about");
          }}
        >
          Plus d'info
        </Button>
      </Stack>
    </>
  );
};

export default DiscoverVoyageur;
