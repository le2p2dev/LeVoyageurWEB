import React from "react";
import listAPI from "../../api/listApi";
import { useQuery } from "react-query";



const StepCard = (id,title,description,duration,lat,lng) => {

    const {isLoading, data : POIs} = useQuery(id+"StepPOIs", () => listAPI.GetPOIsFromStep(id));

    if (isLoading) return "Loading ..."

    else

    return( 
      <>
            {title} : {duration} 
           {description}

           <ul>
           {POIs.response.map(POI => {
               <li key={POI.id}>{POI.title}</li>
           })}
           </ul>

        </>
       

    )
    
}

export default StepCard;