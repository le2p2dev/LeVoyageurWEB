import { Button, Grid, Switch, TextField, IconButton } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import listAPI from "../../api/listApi";
import ListDay from "../day/ListDay";
import { Save } from "@mui/icons-material";

const ListView = ({ openModal }) => {
    const { id } = useParams();

    const { isLoading, data: Steps } = useQuery(id + "steps", () =>
        listAPI.GetStepsFromTrip(id)
    );
    const { isLoading: isLoadingRides, data: Rides } = useQuery(
        id + "rides",
        () => listAPI.GetRidesFromTrip(id)
    );
    const [isRideModalOpen, setIsRideModalOpen] = useState(false);
    const [coordsRideModal, setCoordsRideModal] = useState([]);

    const handleSaveRide = (long1, lat1, long2, lat2) => {
        setCoordsRideModal([long1, lat1, long2, lat2]);
        console.log(long1, lat1, long2, lat2);
    };

    if (isLoading) {
        return <>Loading...</>;
    }
    if (isLoadingRides) {
        return <>Loading...</>;
    }

    return (
        <>
            <div
                style={{
                    position: "fixed",
                    width: "95vw",
                    height: "90vh",
                    overflow: "hidden",
                    overflowY: "scroll",
                }}
            >
                <h2 style={{ paddingLeft: "1%" }}>List</h2>
                {Steps.map((step, no) => {
                    return (
                        <div key={step.id}>
                            <div
                                key={step.id}
                                style={{
                                    margin: "1%",
                                    padding: "1%",
                                    borderRadius: "5px",
                                    background: "#F2FFF2",
                                    boxShadow:
                                        "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                }}
                            >
                                <Grid container spacing={1} sx={{ zIndex: 5 }}>
                                    <Grid item xs={11}>
                                        {step.title ? (
                                            <h3>
                                                Step {no} : {step.title}
                                            </h3>
                                        ) : (
                                            <h3>{no}. no title</h3>
                                        )}
                                    </Grid>
                                    <Grid item xs={1}>
                                        <IconButton
                                            style={{
                                                color: "darkgreen",
                                                marginTop: "1vh",
                                            }}
                                            id="myLocationIcon"
                                            onClick={() =>
                                                openModal(step, "step")
                                            }
                                            aria-label="locate"
                                        >
                                            {" "}
                                            <MyLocationIcon />{" "}
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <div>
                                    <p>{step.description}</p>
                                </div>
                                <ListDay
                                    openModal={openModal}
                                    idStep={step.id}
                                    idTrip={id}
                                />
                            </div>
                            {Rides.map((ride) => {
                                if (ride.stepStart.id == step.id)
                                    return (
                                        <div
                                            key={ride.stepStart.id}
                                            style={{
                                                zIndex: 5,
                                                margin: "1%",
                                                padding: "1%",
                                                borderRadius: "5px",
                                                boxShadow:
                                                    "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                                            }}
                                        >
                                            {ride.estimation
                                                ? ride.estimation
                                                : "0h"}
                                            <IconButton
                                                onClick={() =>
                                                    handleSaveRide(
                                                        ride.stepStart
                                                            .longitude,
                                                        ride.stepStart.latitude,
                                                        ride.stepEnd.longitude,
                                                        ride.stepEnd.latitude
                                                    )
                                                }
                                            >
                                                {" "}
                                                <Save />{" "}
                                            </IconButton>
                                        </div>
                                    );
                            })}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ListView;
