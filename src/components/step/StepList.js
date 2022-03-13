import React from "react";
import { useQuery } from "react-query";
import listAPI from "../../api/listApi";
import { Button } from "@mui/material";


const StepList = (idTrip) => {

    const deleteStep = (id) =>{
        listAPI.DeleteStep(id)
    }

   

    const {isLoading, data : steps} = useQuery(idTrip + "Steps",listAPI.GetSteps(idTrip));

    if (isLoading) return "Loading ..."

    else {
        
        steps.response.map(step =>{
            <div>{step.title + step.description}
            <Button
                onClick={() => {deleteStep(step.id);}}
             >
                Supprimer l'étape
            </Button>      
            </div>
        })

        
    
        
    }


}

export default StepList;
