import {Button, Grid, Switch, TextField} from "@mui/material";
import React from "react";

const CardPoi = ({poi,openModal}) => {

  return <Grid item xs={6} >
    <p style={{
      textAlign: "left",
      paddingLeft: "5%",
      paddingRight: "3%",
    }}>- {poi.title ? poi.title : "No title"}</p>
    <Button onClick={()=>openModal(poi,"poi")}>"""%</Button>
  </Grid>
}


//test
export default CardPoi