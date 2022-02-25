import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import './Map.css'
import MarkerList from './components/MarkerList';
import listAPI from './listApi';

const Map = () => {

  const queryClient = new QueryClient()

  const [lat,setLat] = useState(41.3851);
  const [lng,setLng] = useState(2.1734);

  let idStep = 1;
  const { isLoading, data:markerList} = useQuery(idStep+'markers', listAPI.GetMarkers)
 
  
  const mapStyles = {        
    height: "80vh",
    width: "99%"};
  
  const defaultCenter = {
    lat: lat, lng: lng
  }

  var list = ["Hotels","Restaurants","Museums","Bars","Famous Landmarks"]

 

  const [searchLocation,setSearchLocation] = useState("");

  const handleSearchLocationChange = event => {
		setSearchLocation(event.target.value)
  };
  

  const mapBoxToken = "&access_token=pk.eyJ1IjoiNTczZiIsImEiOiJja3l5Z2JoMWQwcnlsMnJzM2pxN29md2RnIn0.YnpLDRmULNCqnV2XLcmgCQ";
  const urlPreFix = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const urlSettings = "limit=1&types=place";

  const fetchCoords = (input) => {

    const userInputLocation = input.queryKey[1];
   
    const url = urlPreFix+userInputLocation+".json?"+urlSettings+mapBoxToken;
    

    return (fetch(url, {
    method: 'GET',
    })
    .then((res) => res.json())
    .then((data) => {
      return (data);
    })
    .catch((error) => {
        return(error);
    }))
  }


  const { isLoadingX, isError, error, data, refetch } = useQuery(["fetchCoords", searchLocation], fetchCoords, {
      refetchOnWindowFocus:false,
      enabled:false,
      onSuccess: (data) => {

        setLat(data.features[0].center[1]);
        setLng(data.features[0].center[0]);
      }
  });

  const [pinList,setPinList] = useState([]);
  const showMarker = (ev) => {
    setPinList(oldArray => [...oldArray, {lat:ev.latLng.lat(),long:ev.latLng.lng(),set:false}]);

  }

  const renderMarkers = (map,maps) => {

    let marker = new maps.Marker({
      position:{lat:lat,lng:lng}, 
      map,
      title:"name"
    });

    console.log("marker=",marker);

    return marker;
    
  }


  console.log(pinList);
  const handleLocationSearch = () => {

    refetch();
  }


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
            onClick={ev => {showMarker(ev)} }>

            <Marker position={{ lat: lat, lng: lng }} />
            {
              pinList.map((e) => {
                return(<Marker position={{ lat: e.lat, lng: e.long }} />);
              })
            }

            {/* {isLoading? console.log("is loading"): console.log("markerList=",markerList)} */}

          </GoogleMap>   
      </LoadScript>

      {console.log("pinList=",pinList)};
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