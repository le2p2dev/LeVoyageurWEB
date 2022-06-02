import {Button, Grid, Switch, TextField} from "@mui/material";
import React from "react";

const CardPoi = ({id,title,description}) => {

  return <Grid item xs={6} >
    <p style={{
      textAlign: "left",
      paddingLeft: "5%",
      paddingRight: "3%",
    }}>- {title ? title : "No title"}</p>
    <Button onClick={()=>openModal(poi,"poi")}>"""%</Button>
  </Grid>
}

export default CardPoi