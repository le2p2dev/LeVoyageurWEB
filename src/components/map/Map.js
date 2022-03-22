import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import "./Map.css";
import listAPI from "../../api/listApi";
import PoiModal from "./PoiModal";
import { Modal } from "@mui/material";
import StepList from "../step/StepList";


const Map = (idTrip) => {
  const queryClient = useQueryClient();

  const [searchLocation, setSearchLocation] = useState("");
  const [lat, setLat] = useState(41.3851);
  const [lng, setLng] = useState(2.1734);
  const [listPOI, setListPOI] = useState([
    "Hotels",
    "Restaurants",
    "Museums",
    "Bars",
    "Landmarks",
  ]);

  const { isLoading, data: POIList } = useQuery(
    idTrip.idTrip + "POIs",
    () => listAPI.GetPOIsFromTrip(idTrip.idTrip)
  );

  const [selectedPOI,setSelectedPOI] = useState(0);
  const [isPOIModalOpen, setIsPOIModalOpen] = useState(false);
    const handleOpen = (POI) => {
      setIsPOIModalOpen(true);
      setSelectedPOI(POI);
    };

    const handleClose = () => {
      setIsPOIModalOpen(false);
    };

  const addPOI = useMutation(listAPI.CreatePOI, {
    
    onSuccess: () => queryClient.invalidateQueries(idTrip.idTrip + "POIs"),
  });

  const mapStyles = {
    height: "80vh",
    width: "99%",
  };

  const defaultCenter = {
    lat: lat,
    lng: lng,
  };

  const mapBoxToken =
    "&access_token=pk.eyJ1IjoiNTczZiIsImEiOiJja3l5Z2JoMWQwcnlsMnJzM2pxN29md2RnIn0.YnpLDRmULNCqnV2XLcmgCQ";
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

    const url =
      urlPreFix + userInputLocation + ".json?" + urlSettings + mapBoxToken;

    return fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        return error;
      });
  };

  //use query function for getting cords of place
  const { isLoading : isLoadingCoord, isError, error, data, refetch } = useQuery(
    ["fetchCoords", searchLocation],
    fetchCoords,
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data) => {
        setLat(data.features[0].center[1]);
        setLng(data.features[0].center[0]);
      },
    }
  );

  //add to marker array new markes
  const showPOI = (ev) => {
    //setPinList(oldArray => [...oldArray, {lat:ev.latLng.lat(),long:ev.latLng.lng(),set:false}]);
    addPOI.mutate({
      title: "test",
      description: "from web app",
      latitude: ev.latLng.lat(),
      longitude: ev.latLng.lng(),
      tripId: idTrip.idTrip,
    });
  };

  //gets input value from search bar
  const handleSearchLocationChange = (event) => {
    setSearchLocation(event.target.value);
  };

  //on click function. calls fetchcoord refetch
  const handleLocationSearch = () => {
    refetch();
  };

  //google maps api funcion to place a marker
  const renderPOIs = (map, maps) => {
    let marker = new maps.Marker({
      position: { lat: lat, lng: lng },
      map,
      title: "name",
    });
    return marker;
  };

  const updatePOI = useMutation(listAPI.UpdatePOI, {
    onSuccess: () => queryClient.invalidateQueries(idTrip.idTrip + "POIs")
  });

  const updatePOIOnClick = (id,lat,lng) => {

      updatePOI.mutate({
          id:id,
          latitude: lat,
          longitude: lng,
      });
  }


  return (
    <div id="mapFile"> 
    <StepList idTrip = {idTrip.idTrip}></StepList> 
      <div className="searchBar">
        <input
          className="inputBox"
          type="text"
          name="lng"
          placeholder="Search Location"
          onChange={handleSearchLocationChange}
          value={searchLocation}
        />

        <button
          className="buttonClass"
          id="seatchBtnMap"
          type="submit"
          onClick={() => handleLocationSearch()}
        >
          Search Location
        </button>
      </div>

      <div id="mapWrapper">
        <div id = "loadScriptWrapper">

          <LoadScript googleMapsApiKey="AIzaSyAr_YxyNFRK6HRPkMhwxUwyrux4ysNbO4M">
            <GoogleMap
              clickableIcons={false}
              mapContainerStyle={mapStyles}
              zoom={13}
              center={defaultCenter}
              yesIWantToUseGoogleMapApiInternals={true}
              onGoogleApiLoaded={(map, maps) => renderPOIs(map, maps)}
              onClick={(ev) => {
                showPOI(ev);
              }}
              options={{
                styles: [
                  {
                    elementType: "labels.text",
                    featureType: "poi",
                    stylers: [{ visibility: "off" }],
                  },
                ],
              }}
            >
              {/* green pins from onclick */}
              {/* {pinList.map((e, i) => {
                return (
                  <Marker
                    key={i}
                    position={{ lat: e.lat, lng: e.long }}
                    icon={greenPin}
                    draggable={true}
                  />
                );
              })} */}

              {/* red pins from db */}
              {isLoading
                ? null
                : POIList?.response.map((e,i) => {
                  
                    return (
                      <Marker
                        key={i}
                        position={{ lat: e.latitude, lng: e.longitude }}
                        draggable={true}
                        onDragEnd = {(ev) => updatePOIOnClick(e.id,ev.latLng.lat(),ev.latLng.lng())}
                        onClick= {() => handleOpen(e)} 
                        />
                    );
                  })}
            </GoogleMap>
          </LoadScript>
        </div>
        {/* <div id="test">
          {listPOI.map((e, i) => {
            return (
              <div key={i} className="lst">
                <input type="checkbox" />
                <label> {e} </label>
              </div>
            );
          })}
        </div> */}
        {isPOIModalOpen ? <PoiModal title = {selectedPOI.title} description = {selectedPOI.description} id = {selectedPOI.id}   idTrip = {idTrip.idTrip} closePOI = {handleClose}/> : null}  

      </div>
    </div>
  );
};

export default Map;
