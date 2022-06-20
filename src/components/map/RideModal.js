import React, {useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import "./RideModal.css"

import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import DirectionsBikeOutlinedIcon from '@mui/icons-material/DirectionsBikeOutlined';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import Mapbox from "react-map-gl/src/mapbox/mapbox";
import MapBox from "../../api/MapBox";

const RideModal = (coords) => {

    const [distance,setDistance] = useState(256);
    const [time,setTime] = useState("1hour 47minutes");
    const [directionType,setDirectionType] = useState("driving");

    const queryClient = useQueryClient();

    var A = {e: directionType, f: coords};

    const { isLoading: isLoadingDirections, data: directionInfos} = useQuery(
        ["getDirections",[directionType, coords]],
        MapBox.getRidesInfo,
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                console.log(data);
                if(data.routes[0]!=null){
                    setDistance(data.routes[0].distance);
                    setTime(data.routes[0].duration);
                }
                
            },
        }
    );

    
   
    const getDirections = (type) =>{

        setDirectionType(type);

    }

    return(
        <div id="rideModal">

            <div className = "transportModeBox">
                <button className="btnHeaderRide" onClick = {()=>getDirections("driving")}> <DirectionsCarFilledOutlinedIcon/>  </button>
                <button className="btnHeaderRide" onClick = {()=>getDirections("cycling")}> <DirectionsBikeOutlinedIcon/> </button>
                <button className="btnHeaderRide" onClick = {()=>getDirections("walking")}> <DirectionsWalkOutlinedIcon/></button>
            </div>

            <div id = "location">
                <p> x - Y </p>
                
            </div>

            <div className = "rideInfoBox">
            
                <p> {isLoadingDirections? null : (distance/1000).toFixed(2)} km  <CircleIcon sx={{ fontSize: 15 , color:'#4d4d4d'}}/> {isLoadingDirections? null: (time/3600).toFixed(2)} h </p>

            </div>

        </div>
    )

}

export default RideModal;
