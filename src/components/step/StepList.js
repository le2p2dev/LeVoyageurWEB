import React, {useState } from "react";
import listAPI from "../../api/listApi";
import { Button, Card } from "@mui/material";
import "./StepList.css"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { useQuery } from "react-query";
import POIsbyStep from "../POI/POIsByStep"



const StepList = (idTrip) => {


    const {isLoading, data : steps} = useQuery(idTrip.idTrip+"steplist", () => listAPI.GetStepsFromTrip(idTrip.idTrip))


    const [modifyStepTitle,setModifyStepTitle] = useState(false);
    const [modifyStepDescription,setModifyStepDescription] = useState(false);


    const handleClose = () =>{
        setModifyStepTitle(false)
        setModifyStepDescription(false)
    }
        if (isLoading) return "Loading ..."


        else return <ul>
           

           
       
        {steps.response.map(step => { 

           return <li key={step.id}>

        <div id = "stepListBox">
            <IconButton id = "closeIconStep" aria-label="delete" onClick={handleClose}> <CloseIcon /> </IconButton>

            

            <div id="stepInfoBox"> 
                {(modifyStepTitle)?
                    <TextField 
                    className = "inputStyle"
                    margin = "dense"
                    id="outlined-basic" 
                    label="Step Title" 
                    variant="outlined"
                    defaultValue={step.title}/>
                : 
                    <div id = "titleTrip"> 
                        <h2> {step.title}</h2>
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
                        rows={2}
                        defaultValue={step.description}/> 
                : 
                    <div id = "titleTrip"> 
                        <p>{step.description}</p>
                        <IconButton id = "closeIconStep" onClick = {()=>setModifyStepDescription(true)} aria-label="delete"> <AutoFixHighIcon /> </IconButton>
                    </div>
                }
                
            </div>
                
                <POIsbyStep id= {step.id}/>

        </div>


        </li>
            

            }
              ) 
}
        </ul>

   

       

    


}


export default StepList;
