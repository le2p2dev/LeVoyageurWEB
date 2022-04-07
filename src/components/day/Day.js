import { Grid, Select, MenuItem, Checkbox, ListItemText } from "@mui/material";
import React, { useState } from "react";
import PoiList from "../POI/PoiList";

const Day = ({id,idStep,POIs,poisForDay}) => {

    const [poisSelected, setPoisSelected] =useState([]);

    const handleChange = (event) => {
        setPoisSelected(event.target.value)
    } 
   

    return <Grid>
        <PoiList idDay={id} POIs={POIs} idStep={idStep}/>
        <Select
        value={poisSelected}
        multiple
        onChange={handleChange}
        
        
  >
    {poisForDay?.map((poi) => (

        <MenuItem key={poi} value={poi}>{poi}</MenuItem>
    )
    
    )}

    
  </Select>
    </Grid>

}

export default Day;
