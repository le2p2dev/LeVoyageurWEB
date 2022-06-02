import React, {useState } from "react";

import {Button, Grid, Switch} from "@mui/material";
import CardStep from "./CardStep";
import {useQuery} from "react-query";
import listAPI from "../../api/listApi";

const StepListItems = ({idTrip,titleTrip,poisForDay,removePoiOfDay}) => {

    const {isLoading, data : steps} = useQuery(idTrip+ "steps", () => listAPI.GetStepsFromTrip(idTrip))

    if( isLoading){
        return "Loading"
    }

    console.log(steps)

    return <div key={idTrip}>
        <Grid container spacing={2}>
            {steps.map((step) => {
                return (
                    <Grid key={step.id} xs={8} item>
                        <CardStep key={step.id}  removePoiOfDay={removePoiOfDay} poisForDay={poisForDay} idTrip={idTrip} id={step.id} title={step.title} description={step.description} />
                    </Grid>
                )
            })}

        </Grid>
    </div>
}

export default StepListItems