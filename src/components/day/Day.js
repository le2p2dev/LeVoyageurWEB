import { Grid, Select, MenuItem, Checkbox, ListItemText, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import PoiList from "../POI/PoiList";

const Day = ({id,idStep,POIs,poisForDay,removePoiOfDay}) => {

    const [poisSelected, setPoisSelected] =useState([]);
    const handleCancel = () =>{
        setAddingPoiToDayId(0)
        removePoiOfDay(0)
    }
   
    //will go in dayList
    const [AddingPoiToDayId, setAddingPoiToDayId] = useState(0)
   
    useEffect(()=>{
        
        setPoisSelected(poisForDay)
    },[poisForDay])

  

    return <Grid>
        <PoiList idDay={id} POIs={POIs} idStep={idStep}/>
       
    {
    AddingPoiToDayId == id ? 
    
    poisSelected?.map((poi) => (
       
        

          <div key={poi.id}>
         {poi.title ? poi.title : poi.id} <Button onClick={()=> removePoiOfDay(poi.id)}>x</Button>
        </div>

        
    )
    )
    

    :
      <Button onClick={() => setAddingPoiToDayId(id)}>Add Pois</Button>
    
     }

    {AddingPoiToDayId == id ? <div>
        <br/>Add pois by clicking on the map <br/>
        <Button onClick={handleCancel}>Cancel</Button>
        {poisSelected.length>=1 ? <Button>Save</Button> : null}
        </div> : null}
    
    </Grid>

}

export default Day;
