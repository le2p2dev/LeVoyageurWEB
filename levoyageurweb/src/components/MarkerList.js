import React, {  } from 'react';
import listAPI from '../listApi';
import { useQuery} from 'react-query';

export default function MarkerList() {

let idStep = 1;

 const { isLoading, data } = useQuery(idStep+'markers', listAPI.GetMarkers)

 if (isLoading) return "Loading"

 else return data



  


 

}

