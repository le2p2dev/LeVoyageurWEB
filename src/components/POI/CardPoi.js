import {Button, Grid, Switch, TextField, IconButton} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import React from "react";

const CardPoi = ({poi,openModal}) => {

  return (<Grid container spacing={1}>
    <Grid item xs={3} style={{marginTop:"-3.5%"}}>
      <IconButton style={{color:"darkgreen"}} id = "myLocationIcon" onClick = {()=>openModal(poi,"poi")} aria-label="locate"> <MyLocationIcon /> </IconButton>
    </Grid>
    <Grid item xs={8} style={{ textAlign: "left", marginLeft: "5%", }}>
      {poi.title ? poi.title : "No title"}
    </Grid>
    
  </Grid>)
}

export default CardPoi