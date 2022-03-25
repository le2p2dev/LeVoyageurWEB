import React, { useState } from "react";
import TripList from "./trip/TripList";
import { useNavigate } from "react-router-dom";

//mui imports
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

const DiscoverVoyageur = () => {
  const navigate = useNavigate();

  const [number, setNumber] = useState(0);
  const name = ["Bonjour", "Hola", "Guten tag", "Wilkommen", "Nǐn hǎo"];

  var interval = setTimeout(() => {
    let nameChoosen = name[number];
   // document.getElementById("title").innerHTML = "";
    //document.getElementById("title").innerHTML = `<h1> ${nameChoosen}   </h1>`;
    if (number + 1 < name.length) {
      setNumber(number + 1);
    } else {
      setNumber(0);
    }
  }, 2000);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <div id="title">
        <h1>Bonjour</h1>
      </div>
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
    </Grid>
  );
};

export default DiscoverVoyageur;
