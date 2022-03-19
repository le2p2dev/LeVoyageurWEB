import React, {useState } from "react";
import listAPI from "../../api/listApi";
import { Button } from "@mui/material";
import "./StepList.css"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useQuery, useQueryClient } from "react-query";


const StepList = (idTrip) => {

    const queryClient = useQueryClient();
    const { isLoading, data: POIList } = useQuery(
        idTrip.idTrip + "POIs",
        () => listAPI.GetPOIs(idTrip.idTrip)
       
    );
    console.log(POIList)


    const setTitleorID = (id,title) => {

        var toReturn;
        (title)? toReturn = title : toReturn = id;

        return toReturn;

    }

    const[poiArray,setPOIArray] = useState([]);

    const getPoiInfo =() => {

        if(isLoading === true){
            setPOIArray([]);
        }
        else{
            console.log("data=",POIList.response);
            POIList.response.map(
                (e,i) => {
                    setPOIArray(oldArray => [...oldArray, {value:i,label:setTitleorID(e.id,e.title)}]);

                }

            )
        }

        console.log("arr=",poiArray);
        
    }


    
    const POI = [
        {   
            value:"0",
            label: 'Museum',
        },
        {
            value: "Hotel",
            label: 'Hotel',
        },
        {
            value:"Restaurant",
            label: 'Restaurant',
        },
        {
            value:"Monument",
            label: 'Monument',
        },
    ];

    const [poi, setPOI] = useState('');

    const handlePOI = (event) => {
        setPOI(event.target.value);
    };

    const [modifyTitle, setModifyTitle] = useState(false);
    const [modifyStepTitle,setModifyStepTitle] = useState(false);
    const [modifyStepDescription,setModifyStepDescription] = useState(false);

    
    return(

        <div id = "stepListBox">
            <IconButton id = "closeIconStep" aria-label="delete"> <CloseIcon /> </IconButton>

            <div id = "tripTitleBox">

                {(modifyTitle)? 
                    <TextField 
                        className="inputStyle"
                        margin = "dense"
                        id="outlined-basic" 
                        label="Trip Title" 
                        variant="outlined"/>
                
                    : 
                        <div id = "titleTrip"> 
                            <h1> Spain </h1>
                            <IconButton id = "closeIconStep" onClick = {()=>setModifyTitle(true)} aria-label="delete"> <AutoFixHighIcon /> </IconButton>
                        </div>
                }

            </div>

            <div id="stepInfoBox"> 

                {(modifyStepTitle)?
                    <TextField 
                    className = "inputStyle"
                    margin = "dense"
                    id="outlined-basic" 
                    label="Step Title" 
                    variant="outlined"/>
                : 
                    <div id = "titleTrip"> 
                        <h2> Barcelona </h2>
                        <IconButton id = "closeIconStep" onClick = {()=>setModifyStepTitle(true)} aria-label="delete"> <AutoFixHighIcon /> </IconButton>
                    </div>
                }
                
                {(modifyStepDescription)?
                    <TextField
                        className="inputStyle"
                        margin = "dense"
                        id="outlined-textarea"
                        label="Step Description"
                        multiline
                        rows={2}/> 
                : 
                    <div id = "titleTrip"> 
                        <p> Culture trip to Barcelona. </p>
                        <IconButton id = "closeIconStep" onClick = {()=>setModifyStepDescription(true)} aria-label="delete"> <AutoFixHighIcon /> </IconButton>
                    </div>
                }
                
            </div>
            <div id="selectPOIBox">
                <TextField
                    className="inputStyle"
                    margin = "dense"
                    id="outlined-select-currency"
                    select
                    label="POI"
                    onClick={getPoiInfo}
                    value={poi}
                    onChange={handlePOI}>
                        {poiArray.map((option) => (

                            <MenuItem key={option.label} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                </TextField>
                <TextField
                    className="inputStyle"
                    margin = "dense"
                    id="outlined-textarea"
                    label="Poi List"
                    multiline
                    rows={5}/>  
            </div>

        </div>

    );


}


export default StepList;
