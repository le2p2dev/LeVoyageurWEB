import {Button, Grid, Switch, TextField, IconButton} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import React from "react";

const CardPoi = ({poi,openModal}) => {

  return <Grid item xs={6} >
    <p style={{
      textAlign: "left",
      paddingLeft: "5%",
      paddingRight: "3%",
    }}>- {poi.title ? poi.title : "No title"}</p>
    <IconButton id = "myLocationIcon" onClick = {()=>openModal(poi,"poi")} aria-label="locate"> <MyLocationIcon /> </IconButton>
  </Grid>
}

export default CardPoi