import React from "react";
import listAPI from "../../api/listApi";
import { useQuery } from "react-query";



const POIsByStep = (id) => {

    const {isLoading, data : POIs} = useQuery(id.id+"StepPOIs", () => listAPI.GetPOIsFromStep(id.id));

    if (isLoading) return "Loading ..."

    else

    return( 
      <>
           
           <ul>
           {POIs.response.map(POI => {
              return <li key={POI.id}>{POI.title}</li>
           })}
           </ul>

        </>
       

    )
    
}

export default POIsByStep;