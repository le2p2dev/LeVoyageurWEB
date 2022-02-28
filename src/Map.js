import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript,Marker } from '@react-google-maps/api';
import { useQuery, useMutation, useQueryClient } from "react-query";
import './Map.css'
import MarkerList from './components/MarkerList';
import listAPI from './listApi';
import greenPin from './assets/green_pin.png'



const Map = () => {

  const queryClient = useQueryClient();

  const [searchLocation,setSearchLocation] = useState("");
  const [lat,setLat] = useState(41.3851);
  const [lng,setLng] = useState(2.1734);
  const [listPOI,setListPOI] = useState(["Hotels","Restaurants","Museums","Bars","Landmarks"]);
  const [pinList,setPinList] = useState([]);



  const { isLoading, data:markerList} = useQuery('markers', listAPI.GetMarkers);

  const addMarker = useMutation(listAPI.CreateMarker, {
    onSuccess: () => queryClient.invalidateQueries('markers')
  
});

  const mapStyles = {        
    height: "80vh",
    width: "99%"};
  
  const defaultCenter = {
    lat: lat, lng: lng
  }
 
  const mapBoxToken = "&access_token=pk.eyJ1IjoiNTczZiIsImEiOiJja3l5Z2JoMWQwcnlsMnJzM2pxN29md2RnIn0.YnpLDRmULNCqnV2XLcmgCQ";
  const urlPreFix = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const urlSettings = "limit=1&types=place";

/**
 * @fn fetchCords
 * @brief Function that based on user input, does an api request to map box to get coords of the entered place. 
 * @param input => a string 
 * @returns data fetched from mapbox
 * @todo check user input 
 */

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

  //use query function for getting cords of place
  const { isLoadingX, isError, error, data, refetch } = useQuery(["fetchCoords", searchLocation], fetchCoords, {
      refetchOnWindowFocus:false,
      enabled:false,
      onSuccess: (data) => {

        setLat(data.features[0].center[1]);
        setLng(data.features[0].center[0]);
      }
  });

  //add to marker array new markes
  const showMarker = (ev) => {
    //setPinList(oldArray => [...oldArray, {lat:ev.latLng.lat(),long:ev.latLng.lng(),set:false}]);
    addMarker.mutate({
      "pinNumber" : 1,
      "title" : "test",
      "description" : "from web app",
      "latitude" : ev.latLng.lat(),
      "longitude" : ev.latLng.lng()})

  }

  //gets input value from search bar
  const handleSearchLocationChange = event => {
		setSearchLocation(event.target.value)
  };

  //on click function. calls fetchcoord refetch
  const handleLocationSearch = () => {
    refetch();
  }


  //google maps api funcion to place a marker
  const renderMarkers = (map,maps) => {

    let marker = new maps.Marker({
      position:{lat:lat,lng:lng}, 
      map,
      title:"name"
    });

    console.log("marker=",marker);

    return marker;
    
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
            onClick={ev => {showMarker(ev)}}
            options={{ styles: [{ elementType: "labels.text", featureType: "poi", stylers: [{ visibility: "off", }], }]}}>
            
            {/* green pins from onclick */}
            {
              pinList.map((e,i) => {
                return(<Marker 
                  key = {i} 
                  position={{ lat: e.lat, lng: e.long }}  
                  icon = {greenPin}
                  draggable={true}
                  />);
              })
            }

            {/* red pins from db */}
            {isLoading? console.log("is loading"): 
              markerList.response.map((e,i) => {
                  return(<Marker 
                    key = {i} 
                    position={{ lat: e.latitude, lng: e.longitude }}
                     />)
                } 
              )
            }
          
          </GoogleMap>   
      </LoadScript>

      {console.log("pinList=",pinList)};

        <div id ="test">
            {listPOI.map(
              (e,i) => {
                return(
                  <div key={i} className='lst'> 
                    <input type = "checkbox"/>
                    <label> {e} </label>
                  </div>
                )
              }
            )
            }
        </div>
      </div>
    </div>
  )
}

export default Map;