import { Grid, Select, MenuItem } from "@mui/material";
import React, { useState } from "react";
import PoiList from "../POI/PoiList";

const Day = ({id,idStep,POIs}) => {

    const [poisToAdd, setpoiToAdd] =useState([1,2,3]);
    const [poisSelected, setPoisSelected] =useState([]);
    console.log(poisSelected)

    
    const handleChange = (event) => {
        setPoisSelected(event.target.value)
    } 
    const addPoiToDay = (id) => {
        setpoiToAdd(poisToAdd => [...poisToAdd,id])

    }

    return <Grid>
        <PoiList idDay={id} POIs={POIs} idStep={idStep}/>
        <Select
        value={poisSelected}
        multiple
        label="Age"
        onChange={handleChange}
        
        
  >
    {poisToAdd.map((poi) =>
    <MenuItem key={poi} value={poi}>{poi}</MenuItem>
    )}

    
  </Select>
    </Grid>

}

export default Day;
