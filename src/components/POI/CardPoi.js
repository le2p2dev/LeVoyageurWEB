import {Button, Grid, Switch, TextField} from "@mui/material";
import React from "react";

const CardPoi = ({id,title,description}) => {

  return <Grid item xs={6} >
    <p style={{
      textAlign: "left",
      paddingLeft: "5%",
      paddingRight: "3%",
    }}>- {title ? title : "No title"}</p>
  </Grid>
}

export default CardPoi