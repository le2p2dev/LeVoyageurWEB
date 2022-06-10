import {Button, Grid, Switch, TextField, IconButton} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import React from "react";

const CardPoi = ({poi,openModal}) => {

  return <Grid container spacing={1}>
    <Grid item xs={10} style={{
      textAlign: "left",
      paddingLeft: "5%",
      paddingRight: "3%",
    }}>- {poi.title ? poi.title : "No title"}</Grid>
    <Grid item xs={2}>
      <IconButton style={{color:"darkgreen"}} id = "myLocationIcon" onClick = {()=>openModal(poi,"poi")} aria-label="locate"> <MyLocationIcon /> </IconButton>
    </Grid>
  </Grid>
}

export default CardPoi