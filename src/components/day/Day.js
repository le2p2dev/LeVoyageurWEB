import {
  Grid,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PoiList from "../POI/PoiList";
import { useQueryClient, useMutation } from "react-query";
import listAPI from "../../api/listApi";
import { Construction } from "@mui/icons-material";

const Day = ({
  id,
  idStep,
  idTrip,
  number,
  POIs,
  poisForDay,
  removePoiOfDay,
  openModal,
  addPoiToDay,
  AddingPoiToDayId,
  setAddingPoiToDayId
}) => {
  const [poisSelected, setPoisSelected] = useState(poisForDay);
  const handleCancel = () => {
    setAddingPoiToDayId(0);
    removePoiOfDay(0);
  };

  const handleAddingPoi = () => {
    setAddingPoiToDayId(id);
    POIs?.map(poi=>{
      addPoiToDay(poi)
    })
    removePoiOfDay(0);

  }

  const handleSave = () => {
    poisSelected?.map((poi) => {
      associatePoi.mutate({
        id: poi.id,
        stepId: idStep,
        tripId: idTrip,
        dayId: id,
      });
    });
    setAddingPoiToDayId(0);
    removePoiOfDay(0);
  };


  useEffect(() => {
    setPoisSelected(poisForDay);
  }, [poisForDay]);

  const queryClient = useQueryClient();

  const associatePoi = useMutation(listAPI.UpdatePOI, {
    onSuccess: () => {
      queryClient.invalidateQueries(id + "DayPOIs");
    },
  });

  return (
    <Grid style={{ border: "2px solid black", height: "150px", width: "200px", marginLeft:"20px", marginBottom:"20px"}}>
      <p>
        {" "}
        {id} day {number}
      </p>
      <PoiList key={id+POIs} idDay={id} POIs={POIs} idStep={idStep} idTrip={idTrip} openModal={openModal} />

      {AddingPoiToDayId === id ? (
        poisSelected?.map((poi) => (
          <div key={poi.id}>
            {poi.title ? poi.title : poi.id}{" "}
            <Button onClick={() => removePoiOfDay(poi.id)}>x</Button>
          </div>
        ))
      ) : (
        <Button onClick={handleAddingPoi}>Add Pois</Button>
      )}

      {AddingPoiToDayId === id ? (
        <div>
          
          Add pois by clicking on the map 
          <Button onClick={handleCancel}>Cancel</Button>
          {poisSelected?.length >= 1 ? (
            <Button onClick={handleSave}>Save</Button>
          ) : null}
        </div>
      ) : null}
    </Grid>
  );
};

export default Day;
