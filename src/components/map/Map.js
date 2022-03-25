import React, {useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useQuery, useMutation, useQueryClient } from "react-query";
import "./Map.css";
import listAPI from "../../api/listApi";
import PoiModal from "./PoiModal";
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
		height: "80vh",
		width: "99%",
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
	const [isPOIModalOpen, setIsPOIModalOpen] = useState(false);

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
	const handleOpen = (POI) => {
		setIsPOIModalOpen(true);
		setSelectedPOI(POI);
	};

	//close modal POI
	const handleClose = () => {
		setIsPOIModalOpen(false);
	};


	//#endregion

	//#region useQuerries

	const queryClient = useQueryClient();

	//useQuerry to get pois from trip
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
		console.log("showstep");
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
							onClick={(mode==1)? false : ((mode==2)? (ev) => {showPOI(ev)} : (ev) => {showStep(ev)})}
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

						{isLoadingSteps? console.log("stepList loading"): console.log("stepList = ", stepList)}

						//shows markers on map from DB
						{isLoading? null :
							POIList?.map((e,i) => {
								return (
								<Marker
									key={i}
									position={{ lat: e.latitude, lng: e.longitude }}
									draggable={(mode==1)?false:true}
									onDragEnd = {(ev) => updatePOIOnClick(e.id,ev.latLng.lat(),ev.latLng.lng(),i)}
									onClick= {() => handleOpen(e)}
									// onMouseOver = { () => console.log("on mouseover = ",e.title)}
									// icon = {(mode==2)? greenPin : null}
									/>
								);
							})
						}


						</GoogleMap>
					</LoadScript>
				</div>

				{isPOIModalOpen ? <PoiModal title = {selectedPOI.title} description = {selectedPOI.description} id = {selectedPOI.id}   idTrip = {idTrip} closePOI = {handleClose}/> : null}

			</div>
		</div>
	);
};

export default Map;
