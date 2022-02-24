import React, {  } from 'react';
import listAPI from '../listApi';
import { useQuery} from 'react-query';

export default function MarkerList() {

let idStep = 1;

 const { isLoading, data } = useQuery(idStep+'markers', listAPI.GetMarkers)

 if (isLoading) return "Loading"

 else

 return ( 
 
 <div>
  <h2>liste des markers</h2>
  <ul>
 
   {data.response.map(marker => (
 
     <li key={marker.id}>{marker.title} : {marker.latitude},{marker.longitude}</li>
 
   ))}
 
 </ul>
 
 
 </div>)


  


 

}

