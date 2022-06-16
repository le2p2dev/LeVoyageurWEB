import {Button, Grid, Switch, TextField, IconButton} from "@mui/material";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import listAPI from "../../api/listApi";
import ListDay from "../day/ListDay";

const ListView = ({openModal}) => {
  const { id } = useParams();

  const { isLoading, data: Steps } = useQuery(id + "steps", () =>
    listAPI.GetStepsFromTrip(id)
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div style={{
            width: "95vw",
            height: "85vh",
            overflow: "hidden",
            overflowY: "scroll",}}>
        <h3 style={{paddingLeft: "1%"}}>List View</h3>
        {Steps.map((step, no) => {
          return (
            <div
              key={step.id}
              style={{
                margin: "1%",
                padding: "1%",
                borderRadius: "5px",
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              }}
            >
              <Grid container spacing={1}>
                <Grid item xs={11}>
                  {step.title ? (
                    <h3>
                      Step {no} : {step.title}
                    </h3>
                  ) : (
                    <h3>{no}. no title</h3>
                  )}
                </Grid>
                <Grid item xs={1}>
                  <IconButton style={{color:"darkgreen", marginTop:"1vh"}} id = "myLocationIcon" onClick = {()=>openModal(step,"step")} aria-label="locate"> <MyLocationIcon /> </IconButton>
                </Grid>
              </Grid>
              <div>
                <p>{step.description}</p>
              </div>
              <ListDay openModal ={openModal} idStep={step.id} idTrip={id} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ListView;
