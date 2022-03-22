import React from "react";
import { useQuery } from "react-query";
import listAPI from "../../api/listApi";
import { Button, Card } from "@mui/material";
import StepCard from "./StepCard";


const StepList = (idTrip, titleTrip) => {

        const {isLoading, data : steps} = useQuery(idTrip.idTrip+"steplist", () => listAPI.GetStepsFromTrip(idTrip.idTrip))
    
        if (isLoading) return "Loading ..."

        else  return <ul>

            StepList :
       
        {steps.response.map(step => { 

           
             return <li key={step.id}>{step.title}</li>

            }
              ) 
}
        </ul>

   

       

    


}


export default StepList;
