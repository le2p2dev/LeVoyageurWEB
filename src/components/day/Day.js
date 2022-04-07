import { Grid, Select, MenuItem, Checkbox, ListItemText, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PoiList from "../POI/PoiList";

const Day = ({id,idStep,POIs,poisForDay,removePoiOfDay}) => {

    const [poisSelected, setPoisSelected] =useState([]);


    const removePoi = (poi) => {
        let list = poisSelected
        list.splice(list.indexOf(poi),1)
        setPoisSelected(list)
        removePoiOfDay(poisSelected)
    }

   
   
    useEffect(()=>{
        setPoisSelected(poisForDay)
    },[poisForDay])

    return <Grid>
        <PoiList idDay={id} POIs={POIs} idStep={idStep}/>
       
    {poisSelected?.map((poi) => (
       
         

          <div key={poi}>
            {poi} <Button onClick={()=> removePoi(poi)}>
                x
            </Button>
        </div>

    )
    
    )}

    

    </Grid>

}

export default Day;
