import React, { useState } from "react";
import listAPI from "../../api/listApi";
import { useQuery, useMutation, useQueryClient } from "react-query";

//mui
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import GridItem from "@mui/material/Grid";
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
          image={require("../../assets/image.jpeg")}
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
            onClick={() => {
              addTrip.mutate({
                tripName: tripName,
                description: description,
               
              });
              setCreating(false);
            }
             
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
          <h1 style={{ paddingLeft: "2%" }}>Mes voyages</h1>
          <Grid
            container spacing={1}
            sx={{
              paddingLeft: "1%",
              paddingRight: "1%",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {data?.map((trip, i, arr) => {
              return (
                <Grid key={i} item xs={3}>
                  <CardTrip
                    id={trip.id}
                    name={trip.title}
                    description={trip.description}
                    background={trip.backgroundUrl}
                  />
                </Grid>
              );
            })}
            <Grid item>
              <CreateTrip />
            </Grid>
          </Grid>
        </div>
      </>
    );
}
