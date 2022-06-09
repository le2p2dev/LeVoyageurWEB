import {Button, Grid, Switch, IconButton } from "@mui/material";
import { Directions } from "@mui/icons-material";
import React from "react";

const CardPoi = ({poi,openModal}) => {

  return <Grid item xs={6} >
    <p style={{
      textAlign: "left",
      paddingLeft: "5%",
      paddingRight: "3%",
    }}>{poi.title ? poi.title : "No title"}
      <IconButton color="secondary" aria-label="Search location"
        id="findButton"
        type="submit"
        onClick={() => openModal(poi,"poi")}>
        <Directions className="findIcon"/>
      </IconButton>
    </p>
    
  </Grid>
}

export default CardPoi