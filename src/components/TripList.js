import React, {  } from 'react';
import listAPI from '../listApi';
import { useQuery} from 'react-query';
import MarkerList from './MarkerList';

export default function TripList() {

let idUser = 1;

 const { isLoading, data } = useQuery(idUser+'trips', listAPI.GetTrips)

 
 if (isLoading) return "loading..."

 else
 
 return (

   <div>
      <h1>Mes voyages</h1>
     <ul>

       {data.response.map(trip => (

         <li key={trip.id}>{trip.tripName}
        </li>

       ))}

     </ul>


   </div>

 )

}

