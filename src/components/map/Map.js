import React, {useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import "./Map.css";
import listAPI from "../../api/listApi";
import PoiModal from "./PoiModal";
import StepModal from "./StepModal";


import MapBox from "../../api/MapBox"

import greenPin from '../../assets/green_pin.png'


const Map = ({idTrip,mode}) => {


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
		lng: lng,
	};

	//#endregion

	//#region Google Maps Functions

	//google maps api function to show and place a marker/POI
	const renderPOIs = (map, maps) => {
		let marker = new maps.Marker({
		position: { lat: lat, lng: lng },
		map,
		title: "name",
		});
		return marker;
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
	const [POIList,setPOIList] = useState([]);
	const [stepList,setStepList] = useState([]);
	const [selectedPOI,setSelectedPOI] = useState(0);
	const [selectedStep,setSelectedStep] = useState(0);
	const [isPOIModalOpen, setIsPOIModalOpen] = useState(false);
	const [isStepModalOpen,setIsStepModalOpen] = useState(false);

	const [poiTypes,setPoiTypes] = useState([{name:"Shopping",value:false, mapName:"poi.business.Shopping"},
											{name:"Attractions",value:false,mapName:"poi.attraction"},	
											{name:"All Businesses",value:false,mapName:"poi.business"},
											{name:"Lodging",value:false,mapName:"poi.business.Lodging"},
											{name:"Park",value:false,mapName:"poi.park"},
											{name:"Place of worship",value:false,mapName:"poi.place_of_worship"},
											{name:"Medical",value:false,mapName:"poi.medical"},
											/*{name:"Restaurants and Bars",value:false,mapName:"poi.food_drink"}*/]);

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
		console.log("open")
		setIsPOIModalOpen(true);
		setSelectedPOI(POI);
	};

	//close modal POI
	const handleClosePOI = () => {
		setIsPOIModalOpen(false);
	};

	const handleOpenStep = (Step) => {
		setIsStepModalOpen(true);
		setSelectedStep(Step);
	}

	const handleCloseStep = () => {
		setIsStepModalOpen(false);
	}


	const handleCheckBoxPoi = (event,i) => {

		let poiTypesCopy = [...poiTypes];
		poiTypesCopy[i].value = (poiTypesCopy[i].value === true)?false : true;
		setPoiTypes(poiTypesCopy);

	}


	//#endregion

	//#region useQuerries

	const queryClient = useQueryClient();

	//useQuery to get pois from trip
	const { isLoading, data: POIListOriginal } = useQuery(
		idTrip + "POIs",
		() => listAPI.GetPOIsFromTrip(idTrip),
		{onSuccess: (data)=> {setPOIList(data.response)}}
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
	const { isLoading : isLoadingSteps, data: StepList } = useQuery(
		idTrip + "steps",
		() => listAPI.GetStepsFromTrip(idTrip),
		{onSuccess: (data)=> {setStepList(data.response)}}
	);	


	//#endregion

	//#region useMutations

	//create poi in a trip
	const addPOI = useMutation(listAPI.CreatePOI, {
		onSuccess: () => queryClient.invalidateQueries(idTrip + "POIs"),
	});

	//update POI coords
	const updatePOI = useMutation(listAPI.UpdatePOI, {
		onSuccess: () => queryClient.invalidateQueries(idTrip + "POIs")
	});

	//create step in a trip
	const addStep = useMutation(listAPI.CreateStep, {
		onSuccess: () => queryClient.invalidateQueries(idTrip + "POIs"),
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
	};

	//update coords of poi
	const updatePOIOnClick = (id,lat,lng,i) => {

		//change poi location so that there is no glitch on drag drop
		let copy = [... POIList];
		let copyItem = {...copy[i]};
		copyItem.latitude = lat;
		copyItem.longitude = lng;

		copy[i] = copyItem;
		setPOIList(copy);

		//update backend
		updatePOI.mutate({
			id:id,
			latitude: lat,
			longitude: lng,
		});
	}

	//add step from map onclick
	const showStep = (ev) => {
		console.log("ev=",ev.latLng.lat());
		addStep.mutate({
			title: "test",
			description: "step from web app",
			latitude: ev.latLng.lat(),
			longitude: ev.latLng.lng(),
			tripId: idTrip,
		})

	}
	

	//#endregion


	return (
		<div id="mapFile">


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
							onClick={(mode==1)? false : ((mode==2)? (ev) => {showPOI(ev)} : (ev) => {showStep(ev)})}
							options={{

								styles:poiTypes.map((e) => {
									return(
										{
											elementType:"labels.icon",
											featureType:e.mapName,
											stylers: [{ visibility: (e.value)? "on":"off"} ],
										}
									)
								})

							}}
						>

						{isLoadingSteps? null : 
							stepList?.map((e,i) => {
								return(
									<Marker
										key={i}
										position={{ lat: (e.latitude)? e.latitude: 0.0, lng: (e.longitude)? e.longitude:0.0 }}
										draggable={(mode==3)?true:false}
										//onDragEnd = {(ev) => updatePOIOnClick(e.id,ev.latLng.lat(),ev.latLng.lng(),i)}
										onClick= {(mode==3)? () => handleOpenStep(e):null}
										icon = {greenPin}
									/>
								);	
							})
							
						}
						
						//shows markers on map from DB
						{isLoading? null :
							POIList?.map((e,i) => {
								return (
								<Marker
									key={i}
									position={{ lat: e.latitude, lng: e.longitude }}
									draggable={(mode==2)?true:false}
									onDragEnd = {(ev) => updatePOIOnClick(e.id,ev.latLng.lat(),ev.latLng.lng(),i)}
									onClick= {(mode==2)?() => handleOpenPOI(e):null}
									/>
								);
							})
						}


						</GoogleMap>
					</LoadScript>
				</div>
				
				<div id="mapOverlay" >
					
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

					{isPOIModalOpen ? <PoiModal title = {selectedPOI.title} description = {selectedPOI.description} id = {selectedPOI.id}   idTrip = {idTrip} closePOI = {handleClosePOI}/> : null}
					{isStepModalOpen ? <StepModal title = {selectedStep.title} description = {selectedStep.description} id = {selectedStep.id}   idTrip = {idTrip} closePOI = {handleCloseStep}/> : null}

					<div id = "poiTypes">

						{
							poiTypes.map(
								(e,i) => {
									return(
										<div key={i}>
											<input onChange = {(ev) => handleCheckBoxPoi(ev,i)} type="checkbox" name = {e.name} checked={e.value}/>
											<label htmlFor = {e.name}> {e.name} </label>
										</div>
									)
								}
							)
						}

					</div>
				</div>
			</div>
		</div>
	);
};

export default Map;
