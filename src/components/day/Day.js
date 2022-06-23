import {Grid,IconButton} from "@mui/material";
import React, { useEffect, useState } from "react";
import PoiList from "../POI/PoiList";
import { useQueryClient, useMutation } from "react-query";
import listAPI from "../../api/listApi";
import {Save, Cancel, AddLocationAlt} from '@mui/icons-material';

const Day = ({ id, idStep, idTrip, number, POIs, poisForDay, removePoiOfDay, openModal, addPoiToDay, AddingPoiToDayId, setAddingPoiToDayId }) => {
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
    <div style={{ border: "1px solid grey", marginBottom:"10px", marginLeft:"5px", marginRight:"5px", borderRadius:"5px"}}>
      <p style={{marginLeft:"5px"}}>
        {" "}
        Day {number}
      </p>
      <PoiList key={id+POIs} idDay={id} POIs={POIs} idStep={idStep} idTrip={idTrip} openModal={openModal} />

      {AddingPoiToDayId === id ? (
        poisSelected?.map((poi) => (
          <Grid container spacing={1} key={poi.id}>
            <Grid item xs={10}>
              <div style={{marginLeft:"5%"}}>- {poi.title ? poi.title : poi.id}{" "}</div>
            </Grid>
            <Grid item xs={2}>
              <IconButton style={{color:"#e3b600"}} id = "cancel" onClick={() => removePoiOfDay(poi.id)} aria-label="cancel"> <Cancel /> </IconButton>
            </Grid>
          </Grid>
        ))
      ) : (
        <IconButton style={{color:"darkgreen"}} id="addPois" onClick={handleAddingPoi} aria-label="addPois"> <AddLocationAlt /> </IconButton>
      )}

      {AddingPoiToDayId === id ? (
        <div style={{marginLeft:"2%"}}>
          Click on Pois to add them
          {poisSelected?.length >= 1 ? (
            <IconButton style={{color:"darkgreen"}} id = "save" onClick={handleSave} aria-label="save"> <Save /> </IconButton>
          ) : null}
          <IconButton style={{color:"#e3b600"}} id = "cancel" onClick={handleCancel} aria-label="cancel"> <Cancel /> </IconButton>
          
        </div>
      ) : null}
    </div>
  );
};

export default Day;
