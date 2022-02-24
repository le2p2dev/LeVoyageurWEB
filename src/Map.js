import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import './Map.css'
const Map = () => {

  const queryClient = new QueryClient()

  const [lat,setLat] = useState(41.3851);
  const [lng,setLng] = useState(2.1734);

  
  const mapStyles = {        
    height: "80vh",
    width: "99%"};
  
  const defaultCenter = {
    lat: lat, lng: lng
  }

  var list = ["Hotels","Restaurants","Museums","Bars","Famous Landmarks"]

 

  const [searchLocation,setSearchLocation] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const handleSearchLocationChange = event => {
		setSearchLocation(event.target.value)
  };
  

  const mapBoxToken = "&access_token=pk.eyJ1IjoiNTczZiIsImEiOiJja3l5Z2JoMWQwcnlsMnJzM2pxN29md2RnIn0.YnpLDRmULNCqnV2XLcmgCQ";
  const urlPreFix = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const urlSettings = "limit=1&types=place";

  const fetchCoords = (input) => {

    const userInputLocation = input.queryKey[1];
    console.log("userInput", userInputLocation);
    const url = urlPreFix+userInputLocation+".json?"+urlSettings+mapBoxToken;
    console.log(url);

    return (fetch(url, {
    method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => {
      console.log("inside", data);
      //console.log(data.features[0].center);
      return (data);
    })
    .catch((error) => {
        //console.log("failed: ", error)
        return(error);
    }))
  }


  const { isLoading, isError, error, data, refetch } = useQuery(["fetchCoords", searchLocation], fetchCoords, {
      refetchOnWindowFocus:false,
      enabled:false,
      onSuccess: (data) => {
        console.log("onSuccess",data);
        setLat(data.features[0].center[1]);
        setLng(data.features[0].center[0]);
      }
  });

  const renderMarkers = (map,maps) => {

    let marker = new maps.Marker({
      position:{lat:lat,lng:lng},
      map,
      title:"name"
    });

    console.log("marker=",marker);

    return marker;
    
  }

  const handleLocationSearch = () => {

    console.log(searchLocation);
    refetch();
    //console.log("Promise=",promise);
    //const data = promise.then((data) => {console.log(data)});
    
    

  }

  isLoading ? console.log("not finished loading") :  console.log(data);
  
  return (

    <div id = "mapFile">
      <div className = "searchBar">
        <input 
          className = "inputBox"
          type="text"
          name="lng"
          placeholder="Search Location"
          onChange = {handleSearchLocationChange}
          value = {searchLocation} /> 

        <button 
          className = "buttonClass" 
          id = "seatchBtnMap"
          type = "submit" 
          onClick = {() => handleLocationSearch()}> 
            Search Location
        </button>
      </div>

      <div id = "mapWrapper">
      <LoadScript
        googleMapsApiKey='AIzaSyAr_YxyNFRK6HRPkMhwxUwyrux4ysNbO4M'>
          <GoogleMap 
            mapContainerStyle={mapStyles}
            zoom={13}
            center={defaultCenter}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={(map, maps)=> renderMarkers(map,maps) }
            onClick={ev => {
              console.log("latitide = ", ev.latLng.lat());
              console.log("longitude = ", ev.latLng.lng());
            }}>
            <Marker position={{ lat: lat, lng: lng }} />
            <Marker position={{ lat: lat, lng: lng }} />
          </GoogleMap>   
      </LoadScript>
        <div id ="test">
          <div className="lst">
            <input type="checkbox"/>
            <label>Hotels</label>
          </div>
          <div className="lst">
            <input type="checkbox"/>
            <label>Restaurants</label>
          </div>
          <div className="lst">
            <input type="checkbox"/>
            <label>Bars</label>
          </div>
          <div className="lst">
            <input type="checkbox"/>  
            <label>Museums</label>
          </div>
          <div className="lst">
            <input type="checkbox"/>
            <label>Landmarks</label>    
          </div>
        </div>
      </div>
     
    </div>
  )
}

export default Map;