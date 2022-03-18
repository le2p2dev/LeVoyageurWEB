import React, { useState } from "react";
import listAPI from "../../api/listApi";
import { useQuery, useMutation, useQueryClient } from "react-query";

//mui
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import TextField from "@mui/material/TextField";

//modules
import CardTrip from "./CardTrip";

export const CreateTrip = () => {
  let idUser = 1;
  const queryClient = useQueryClient();
  const [tripName, setTripName] = useState();
  const [description, setDescription] = useState();

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTripNameChange = (event) => {
    setTripName(event.target.value);
  };

  const addTrip = useMutation(listAPI.CreateTrip, {
    onSuccess: () => queryClient.invalidateQueries(idUser + "trips"),
  });

  const [creating, setCreating] = useState(false);

  return creating ? (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component="img"
          height="140"
          image={require("../../assets/dune.png")}
          alt="dune"
        />
        <CardContent>
          <TextField
            id="standard-basic"
            label="title"
            variant="standard"
            onChange={handleTripNameChange}
          />

          <TextField
            id="standard-basic"
            label="Description"
            variant="standard"
            onChange={handleDescriptionChange}
          />
        </CardContent>
        <CardActions>
          <Button
            onClick={() =>
              addTrip.mutate({
                tripName: tripName,
                description: description,
              })
            }
          >
            Create a new trip
          </Button>
          <Button onClick={() => setCreating(false)}> Cancel</Button>
        </CardActions>
      </Card>
    </>
  ) : (
    <>
      <Button
        onClick={() => {
          setCreating(true);
        }}
      >
        Create Trip
      </Button>
    </>
  );
};

export default function TripList() {
  let idUser = 1;
  const { isLoading, data } = useQuery(idUser + "trips", listAPI.GetTrips);

  if (isLoading) return "loading ...";
  else
    return (
      <>
        <div>
          <h1>Mes voyages</h1>
          <Grid container spacing={2} sx={{ paddingLeft: "5%" }}>
            {data?.response.map((trip, i, arr) => {
              if (arr.length - 1 === i) {
                return (
                  <div key = {i}>
                    <Grid  item>
                      <CardTrip
                        id={trip.id}
                        name={trip.title}
                        description={trip.description}
                      />
                    </Grid>
                  </div>
                );
              }
              return (
                <Grid key={i} item >
                  <CardTrip
                    id={trip.id}
                    name={trip.tripName}
                    description={trip.description}
                  />
                </Grid>
              );
            })}
            <Grid item>
              <CreateTrip />
            </Grid>
          </Grid>

          <div></div>
        </div>
      </>
    );
}
