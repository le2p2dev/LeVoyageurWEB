import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {GoogleMap,
  InfoBox,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import Slide from "@mui/material/Slide";
import listAPI from "../../api/listApi";
import PoiModal from "./PoiModal";
import StepModal from "./StepModal";
import MapBox from "../../api/MapBox";
import "./Map.css";

import greenPin from "../../assets/green_pin.png";
import yellowStepPin from "../../assets/yellowStep_pin.png";
import yellowPoiPin from "../../assets/yellowPoi_pin.png";
import redPin from "../../assets/red_pin.png";

import Notification from "./Notification";
import PoiList from "../POI/PoiList";
import ListView from "./ListView";
import TripFiles from "../files/TripFiles";

const Map = ({
  idTrip,
  mode,
  addPoiToDay,
  poisForDay,
  removePoiOfDay,
  poiTypes,
  changeMode
}) => {
  //#region Get browser geolocalisation
  // if ("geolocation" in navigator) {
  //   navigator.geolocation.getCurrentPosition(position => {
  //       console.log("location=",position.coords.latitude, position.coords.longitude);
  // });
  // } else { console.log("nope location") }
  //#endregion

  //#region Google Maps style and initial location

  const [lat, setLat] = useState(41.3851);
  const [lng, setLng] = useState(2.1734);

  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: lat,
    lng: lng
  };


  //#endregion

  //#region useState Variables

  const [searchLocation, setSearchLocation] = useState("");
  const [POICategory, setPOICategory] = useState([
    "Hotels",
    "Restaurants",
    "Museums",
    "Bars",
    "Landmarks",
  ]);
  const [POIList, setPOIList] = useState([]);
  const [stepList, setStepList] = useState([]);
  const [selectedPOI, setSelectedPOI] = useState();
  const [selectedStep, setSelectedStep] = useState();
  const [isPOIModalOpen, setIsPOIModalOpen] = useState(false);
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [zoom,setZoom] = useState(7);
   //id du day dans lequel des poi sont entrain d'etre ajouté, 0 si quand il n'y en a pas
   const [AddingPoiToDayId, setAddingPoiToDayId] = useState(0);
   //Label on hover pour le mode nav
   const[poiLabel,setPoiLabel] = useState("");
   const[stepLabel,setStepLabel] = useState("");
   const [rideList, setRideList] = useState([]);
  

  const [notificationTransition, setNotificationTransition] =
    useState(undefined);
  const [isOpenNavModeNotification, setIsOpenNavModeNotification] =
    useState(false);
  const [isOpenUpdatePOINotification, setIsOpenUpdatePOINotification] =
    useState(false);
  const [isOpenDeletePoiNotification, setIsOpenDeletePOINotification] =
    useState(false);
  const [firstStepLoading, setFirstStepLoading] = useState(false);
  const [mapRef, setMapRef] = useState();


  //#endregion

  //#region Handler Functions
  //gets input value from search bar
  const handleSearchLocationChange = (event) => {
    setSearchLocation(event.target.value);
  };

  //on click function. calls fetchcoord refetch
  const handleLocationSearch = () => {
    refetch();
  };


  //open modal POI
  const handleOpenPOI = (POI) => {
    setIsPOIModalOpen(true);
    setSelectedPOI(POI);
  };

  //close modal POI
  const handleClosePOI = () => {
    setIsPOIModalOpen(false);
    setSelectedPOI(null)
  };

  const handleOpenStep = (Step) => {
    setIsStepModalOpen(true);
    setSelectedStep(Step);

  };

  const handleCloseStep = () => {
    setIsStepModalOpen(false);
    setSelectedStep(null)
  };

  const center = () => {
    if(isPOIModalOpen && mode==2 ){
   return selectedPOI.latitude, selectedPOI.longitude
  }
     
        if(isStepModalOpen && mode==3){
          return selectedStep.latitude,selectedStep.longitude }
          
      else return defaultCenter}
  //#endregion

  //#region useQuerries

  const queryClient = useQueryClient();

  //useQuery to get pois from trip
  const { isLoading, data: POIListOriginal } = useQuery(
    idTrip + "POIs",
    () => listAPI.GetPOIsFromTrip(idTrip),
    {
      onSuccess: (data) => {
        setPOIList(data);
      },
    }
  );

  //use query function for getting cords of place
  const { data, refetch } = useQuery(
    ["fetchCoords", searchLocation],
    MapBox.fetchCoords,
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data) => {
        setLat(data.features[0].center[1]);
        setLng(data.features[0].center[0]);
      },
    }
  );

  // Get steps from trip
  const { isLoading: isLoadingSteps, data: stepListOriginal } = useQuery(
    idTrip + "steps",
    () => listAPI.GetStepsFromTrip(idTrip),
    {
      onSuccess: (data) => {
        setStepList(data);
        setFirstStepLoading(true);
      },
    }
  );

   // Get rides from trip
   const { isLoading: isLoadingRides, data: RideListOriginal,refetch:refetchRides} = useQuery(
    idTrip + "ride",
    () => listAPI.GetRidesFromTrip(idTrip),
    {
      onSuccess: (data) => {
        setRideList(data);
      },
    }
  );


  useEffect(() => {
    if (firstStepLoading == true && stepListOriginal[0]) {
      setLat(stepListOriginal[0]?.latitude);
      setLng(stepListOriginal[0]?.longitude);
    }

  }, [firstStepLoading]);

  //#endregion

  //#region useMutations

  //create poi in a trip
  const addPOI = useMutation(listAPI.CreatePOI, {
    onSuccess: () => {
      queryClient.invalidateQueries(idTrip + "POIs");
    },
  });

  //update POI coords
  const updatePOI = useMutation(listAPI.UpdatePOI, {
    onSuccess: () => queryClient.invalidateQueries(idTrip + "POIs"),
  });

  //create step in a trip
  const addStep = useMutation(listAPI.CreateStep, {
    onSuccess: () => {
      queryClient.invalidateQueries(idTrip + "steps");
      refetchRides();
    }
  });

  //update Step coords
  const updateStep = useMutation(listAPI.UpdateStep, {
    onSuccess: () => {
      queryClient.invalidateQueries(idTrip + "steps");
      refetchRides();
    }
  });

  //#endregion

  //#region Other Functions

  //add to POI from map onclick
  const showPOI = (ev) => {
    
    addPOI.mutate({
      title: "test",
      description: "from web app",
      latitude: ev.latLng.lat(),
      longitude: ev.latLng.lng(),
      tripId: idTrip,
    });
    console.log("poiList=",PoiList);
  };

  //update coords of poi
  const updatePOIOnClick = (id, lat, lng, i) => {
    //change poi location so that there is no glitch on drag drop
    let copy = [...POIList];
    let copyItem = { ...copy[i] };
    copyItem.latitude = lat;
    copyItem.longitude = lng;

    copy[i] = copyItem;
    setPOIList(copy);

    //update backend
    updatePOI.mutate({
      id: id,
      latitude: lat,
      longitude: lng,
      tripId: idTrip,
    });
  };

  //update coords of step
  const updateStepOnClick = (id, lat, lng, i) => {
    //change step location so that there is no glitch on drag drop
    let copy = [...stepList];
    let copyItem = { ...copy[i] };
    copyItem.latitude = lat;
    copyItem.longitude = lng;

    copy[i] = copyItem;
    setStepList(copy);

    //update backend
    updateStep.mutate({
      id: id,
      latitude: lat,
      longitude: lng,
      tripId: idTrip,
    });

  };

  //add step from map onclick
  const showStep = (ev) => {
    addStep.mutate({
      title: "test",
      description: "step from web app",
      latitude: ev.latLng.lat(),
      longitude: ev.latLng.lng(),
      tripId: idTrip,
    });

    
  };

  useEffect(() => {
    if(mode==2) handleCloseStep()
    if(mode==3) handleClosePOI()
  }, [mode]);

  const setNewCenter = () => {
    if (mapRef != null) {
      var center = mapRef.getCenter();
      setLat(center.lat());
      setLng(center.lng());
    }
  };

  //to open the modal of data, type is poi or step
  const openModal = (data,type) => {
    console.log(data)
    if(type=="poi"){
      changeMode("2");
      setSelectedPOI(data);
      setIsPOIModalOpen(true);
      setZoom(13);
      setLat(data.latitude);
      setLng(data.longitude);
    }
    if(type=="step"){
      changeMode("3");
      setSelectedStep(data);
      setIsStepModalOpen(true);
      setZoom(13);
      setLat(data.latitude);
      setLng(data.longitude);
    }
    
  }

  //#endregion

  //#region function for notifications

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const openNavModeNotification = (NotificationTransition) => {
    setIsOpenNavModeNotification(true);
    setNotificationTransition(() => NotificationTransition);
  };

  const closeNavModeNotification = (NotificationTransition) => {
    setIsOpenNavModeNotification(false);
    setNotificationTransition(() => NotificationTransition);
  };

  const openUpdatePOINotification = (NotificationTransition) => {
    setIsOpenUpdatePOINotification(true);
    setNotificationTransition(() => NotificationTransition);
  };

  const closeUpdatePOINotification = (NotificationTransition) => {
    setIsOpenUpdatePOINotification(false);
    setNotificationTransition(() => NotificationTransition);
  };

  const openDeletePOINotification = (NotificationTransition) => {
    setIsOpenDeletePOINotification(true);
    setNotificationTransition(() => NotificationTransition);
  };

  const closeDeletePOINotification = (NotificationTransition) => {
    setIsOpenDeletePOINotification(false);
    setNotificationTransition(() => NotificationTransition);
  };

  //#endregion

  //définition polyline
  const [path, setPath] = useState([]);
  const onLoad = (polyline) => {


  };

  const clickLine = () => {

  };

  if (!stepList) {
    return <>loading</>;
  }

  /*
	  const stepPath = []
	  stepList.map( (step) => {
		stepPath.push({lat: step.latitude,lng: step.longitude})
	  })
	  setPath(stepPath)
	  */


    const setPathObject = (startStep,endStep) => {

      var start = {};
      var end = {};

      if(startStep!=null){
        start = {lat:startStep.latitude,lng:startStep.longitude};
      }
      else{
        start = null;
      }

      if(endStep!=null){
        end = { lat: endStep.latitude, lng: endStep.longitude };
      }
      else{
        end = null;
      }
      if(start && end){
        return(
          [
            start,
            end
          ]
        );
      }
      else return [];
    }


  return (
    mode == 5 ?
    <TripFiles idTrip={idTrip}></TripFiles>
    :
    mode == 4 ? 
    <ListView openModal={openModal}/>
    :
      <>
      <div className="searchBar">
        <TextField
        className="searchText"
          id="outlined-search"
          label="Search"
          type="search"
          margin="normal"
          size="small"
          variant="outlined"
          onChange={handleSearchLocationChange}
          value={searchLocation}
          onKeyPress={(ev) => { if (ev.key === 'Enter') { handleLocationSearch(); } }}
        />
        <IconButton color="secondary" aria-label="Search location"
          id="seatchBtnMap" type="submit" onClick={() => handleLocationSearch()}>
          <SearchRounded className="searchIcon"/>
        </IconButton>
      </div>
        <div className="mapDiv">
          <LoadScript googleMapsApiKey="AIzaSyAYdTsYL1j24J-9yh82wyY8K088VoYT69M">
            <GoogleMap
              clickableIcons={mode == 1 ? true : false}
              mapContainerStyle={mapStyles}
              zoom={zoom}
              center={defaultCenter}
              onCenterChanged={isPOIModalOpen || isStepModalOpen ? null : setNewCenter}
              yesIWantToUseGoogleMapApiInternals={true}
              onLoad={(ev) => setMapRef(ev)}
              onClick={
                mode == 1
                  ? () => openNavModeNotification(TransitionUp)
                  : mode == 2
                  ? (ev) => {
                      showPOI(ev);
                    }
                  : mode == 3
                  ? (ev) => {
                      showStep(ev);
                    }
                  : null
              }
              options={{
                
                styles: poiTypes.map((e) => {
                  return {
                    elementType: "labels.icon",
                    featureType: e.mapName,
                    stylers: [{ visibility: e.value ? "on" : "off" }],
                  };
                }),
              }}
            >


              {isLoadingSteps
                ? null
                : stepList?.map((e, i) => {
                    return (
                      <Marker
                        key={i}
                        position={{
                          lat: e.latitude ? e.latitude : 0.0,
                          lng: e.longitude ? e.longitude : 0.0,
                        }}
                        draggable={mode == 3 ? true : false}
                        onDragEnd={(ev) =>
                          updateStepOnClick(
                            e.id,
                            ev.latLng.lat(),
                            ev.latLng.lng(),
                            i
                          )
                        }
                        onClick={() => (mode == 3 ? handleOpenStep(e) : null)}
                        icon={selectedStep?.id === e.id && isStepModalOpen ? yellowStepPin : greenPin}
                        onMouseOver={mode==1 ? 
                          ()=>setStepLabel(e.title ? e.title : "no title")
                          :
                           ()=>setStepLabel("") }

                        onMouseOut={()=> setStepLabel("")}
                        label={mode==1 && e.title===stepLabel ? stepLabel : null}
                        
                      />
                    );
                  })}
              //shows markers on map from DB
              {isLoading
                ? null
                : POIList?.map((e, i) => {
                    return (
                      <Marker
                        key={i}
                        position={{ lat: e.latitude, lng: e.longitude }}
                        draggable={mode == 2 ? true : false}
                        onDragEnd={(ev) =>
                          updatePOIOnClick(
                            e.id,
                            ev.latLng.lat(),
                            ev.latLng.lng(),
                            i
                          )
                        }
                        onMouseOver={mode==1 ? 
                          ()=>setPoiLabel(e.title ? e.title : "no title")
                          :
                           ()=>setPoiLabel("") }

                        onMouseOut={()=> setPoiLabel("")}
                        
                        onClick={
                          mode != 3 && mode !=1
                            ? () => handleOpenPOI(e)
                            : AddingPoiToDayId != 0 ? () => addPoiToDay(e) : null 
                        }
                        icon={
                          poisForDay.find((element) => element === e) && mode == 3
                            ? yellowPoiPin
                            : selectedPOI?.id === e.id && isPOIModalOpen ? yellowPoiPin : redPin}
                        
                        label={ (mode == 3 && e.StepId == selectedStep?.id && isStepModalOpen) ? e.title : mode==1 && e.title===poiLabel ? poiLabel : null}

                      >
                      </Marker>

                    );
                  })}
              //définition du polyline
              {isLoadingRides? null: (
                RideListOriginal.map((e,i)=>{
                  return(
                    <Polyline
                      key={i}
                      onLoad={onLoad}
                      path={setPathObject(e.stepStart,e.stepEnd)}
                      onClick={() => clickLine()}
                      options={{
                        geodesic: true,
                        strokeColor: "green",
                        strokeWeight: "4",
                      }}
                    />
                  )
                })
                
              )
              }


            </GoogleMap>
          </LoadScript>
        </div>

        <div id="">

          {isPOIModalOpen && selectedPOI ? (
            <PoiModal
              title={selectedPOI.title}
              description={selectedPOI.description}
              id={selectedPOI.id}
              idTrip={idTrip}
              closePOI={handleClosePOI}
              openUpdatePOINotification={openUpdatePOINotification}
              openDeletePOINotification={openDeletePOINotification}
            />
          ) : null}
          {isStepModalOpen && selectedStep ? (
            <StepModal
              title={selectedStep.title}
              description={selectedStep.description}
              id={selectedStep.id}
              duration={selectedStep.duration}
              idTrip={idTrip}
              addPoiToDay={addPoiToDay}
              poisForDay={poisForDay}
              closeStep={handleCloseStep}
              removePoiOfDay={removePoiOfDay}
              openModal={openModal}
              AddingPoiToDayId={AddingPoiToDayId}
              setAddingPoiToDayId={setAddingPoiToDayId}
              refetchRides={refetchRides}
            />
          ) : null}
          {isOpenNavModeNotification ? (
            <Notification
              severity={"info"}
              message="You are in Navigation Mode"
              open={isOpenNavModeNotification}
              close={closeNavModeNotification}
              transition={notificationTransition}
            />
          ) : null}
          {isOpenUpdatePOINotification ? (
            <Notification
              severity={"info"}
              message="Poi succesfully updated"
              open={isOpenUpdatePOINotification}
              close={closeUpdatePOINotification}
              transition={notificationTransition}
            />
          ) : null}
          {isOpenDeletePoiNotification ? (
            <Notification
              severity={"info"}
              message="Poi succesfully deleted"
              open={isOpenDeletePoiNotification}
              close={closeDeletePOINotification}
              transition={notificationTransition}
            />
          ) : null}
        </div>
      </>
  );
};

export default Map;
