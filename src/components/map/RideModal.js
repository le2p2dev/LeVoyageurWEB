import React, { useState } from "react";
import { useQuery, queryClient, useMutation } from "react-query";
import "./RideModal.css";

import DirectionsCarFilledOutlinedIcon from "@mui/icons-material/DirectionsCarFilledOutlined";
import DirectionsBikeOutlinedIcon from "@mui/icons-material/DirectionsBikeOutlined";
import DirectionsWalkOutlinedIcon from "@mui/icons-material/DirectionsWalkOutlined";
import CloseIcon from "@mui/icons-material/Close";
import CircleIcon from "@mui/icons-material/Circle";
import MapBox from "../../api/MapBox";
import listAPI from "../../api/listApi";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const RideModal = ({
    coords,
    closeRide,
    tripId,
    startStep,
    endStep,
    rideId,
}) => {
    const [distance, setDistance] = useState(0);
    const [time, setTime] = useState("");
    const [directionType, setDirectionType] = useState("driving");
    const [startStepName, setStartStepName] = useState("");
    const [endStepName, setEndStepName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    //use query to get estimated time and distance for the ride
    const { isLoading: isLoadingDirections, data: directionInfos } = useQuery(
        ["getDirections", [directionType, coords]],
        MapBox.getRidesInfo,
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                if (data.code == "Ok" && data.routes[0] != null) {
                    setDistance(data.routes[0].distance);
                    setTime(data.routes[0].duration);
                }
                if (data.code != "Ok") {
                    setErrorMsg("Error finding a route");
                }
            },
        }
    );

    //useQuerry to get stepNamestart
    const { isLoading: isLoadingStepStartInfo, data: stepStartInfo } = useQuery(
        ["getStepInfo", [startStep, tripId]],
        listAPI.GetStepByID,
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                if (data.title != null) {
                    setStartStepName(data.title);
                } else setStartStepName("untitled");
            },
        }
    );

    //useQuerry to get stepNamestart
    const { isLoading: isLoadingStepEndInfo, data: stepEndInfo } = useQuery(
        ["getStepInfo", [endStep, tripId]],
        listAPI.GetStepByID,
        {
            refetchOnWindowFocus: false,
            onSuccess: (data) => {
                if (data.title != null) {
                    setEndStepName(data.title);
                } else setEndStepName("untitled");
            },
        }
    );

    const getDirections = (type) => {
        setDirectionType(type);
    };

    const updateDirectionTime = useMutation(listAPI.UpdateRide, {
        onSuccess: () => {
            queryClient.invalidateQueries(tripId + "ride");
        },
    });

    const updateRide = (param) => {
        updateDirectionTime.mutate({
            estimation: time,
            travelType: directionType,
            TripId: tripId,
        });
    };

    return (
        <div id="rideModal">
            <button id="closeIcon" onClick={closeRide}>
                {" "}
                <CloseIcon />
            </button>

            <div id="modalTitle"> Ride Information </div>

            <div className="transportModeBox">
                <button
                    className="btnHeaderRide"
                    onClick={() => getDirections("driving")}
                >
                    {" "}
                    <DirectionsCarFilledOutlinedIcon />{" "}
                </button>
                <button
                    className="btnHeaderRide"
                    onClick={() => getDirections("cycling")}
                >
                    {" "}
                    <DirectionsBikeOutlinedIcon />{" "}
                </button>
                <button
                    className="btnHeaderRide"
                    onClick={() => getDirections("walking")}
                >
                    {" "}
                    <DirectionsWalkOutlinedIcon />
                </button>
            </div>

            <div id="location">
                <p>
                    {" "}
                    {isLoadingStepStartInfo ? null : startStepName} -{" "}
                    {isLoadingStepEndInfo ? null : endStepName}{" "}
                </p>
            </div>

            <div className="rideInfoBox">
                {isLoadingDirections ? null : updateRide()}
                <p>
                    {isLoadingDirections ? (
                        <AutorenewIcon />
                    ) : (
                        (distance / 1000).toFixed(2) + "km"
                    )}{" "}
                    <CircleIcon sx={{ fontSize: 15, color: "#4d4d4d" }} />{" "}
                    {isLoadingDirections ? (
                        <AutorenewIcon />
                    ) : (
                        (time / 3600).toFixed(2) + "h"
                    )}{" "}
                </p>
            </div>
        </div>
    );
};

export default RideModal;
