import React, { useState } from 'react';
import listAPI from '../listApi';
import { useQuery, useMutation, useQueryClient} from 'react-query';

export default function TripList() {

let idUser = 1;

const [tripName,setTripName] =  useState();
const [description,setDescription] = useState();

 const { isLoading, data } = useQuery(idUser+'trips', listAPI.GetTrips)

 const queryClient = useQueryClient();

 const addTrip = useMutation(listAPI.CreateTrip, {
  onSuccess: () => queryClient.invalidateQueries(idUser+'trips')

});

const handleDescriptionChange = event => {
  setDescription(event.target.value)
};

const handleTripNameChange = event => {
  setTripName(event.target.value)
};

 
 if (isLoading) return "loading ..."

 else

 return (
  <>
   <div>
      <h1>Mes voyages</h1>
     <ul>

       {data.response.map(trip => (
  
       

         <li key={trip.id}>{
             <a href={"/trip/" + trip.id}>
                {trip.tripName} | {trip.description}
              </a>
        </li>

       ))}

     </ul>
     <div>

        <input 
          type="text"
          placeholder="Trip name"
          onChange={handleTripNameChange}
          value = {tripName} /> 

        <input 
          type="text"
          placeholder="description"
          onChange={handleDescriptionChange}
          value = {description} /> 

        

        <button 
         
          type = "submit" 
          onClick = {() => addTrip.mutate({
            "tripName" : tripName,
            "description" : description})
          }> 
            Create a new trip

        </button>
      </div>

   </div>

  </>

 )

}
