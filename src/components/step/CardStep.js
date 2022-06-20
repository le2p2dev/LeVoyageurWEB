import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import listAPI from "../../api/listApi";
import "./StepList.css";
import DayList from "../day/DayList";
import IconButton from "@mui/material/IconButton";
import { Save, Cancel, Close } from "@mui/icons-material";
import { Button, TextField, Grid } from "@mui/material";
import FileStep from "../files/FileStep";
import { maxHeight } from "@mui/system";

const CardStep = ({
  idTrip,
  title,
  description,
  duration,
  idStep,
  poisForDay,
  removePoiOfDay,
  openModal,
  addPoiToDay,
  AddingPoiToDayId,
  setAddingPoiToDayId,
  file,
}) => {
  !title ? (title = "") : (title = title);
  !description ? (description = "") : (description = description);
  !duration ? (duration = 0) : (duration = duration);

  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newDuration, setNewDuration] = useState(duration);

  const [showSave, setShowSave] = useState(false);

  const handleChangeTitle = (event) => {
    setNewTitle(event.target.value);
  };
  const handleChangeDescription = (event) => {
    setNewDescription(event.target.value);
  };
  const handleChangeDuration = (event) => {
    setNewDuration(event.target.value);
  };

  const saveChanges = () => {
    updateStep.mutate({
      title: newTitle,
      description: newDescription,
      duration: newDuration,
      id: idStep,
      tripId: idTrip,
    });
  };

  const cancelChanges = () => {
    setShowSave(false);
    setNewTitle(title ? title : "");
    setNewDescription(description ? description : "");
    setNewDuration(duration ? duration : 0);
  };

  const queryClient = useQueryClient();

  const updateStep = useMutation(listAPI.UpdateStep, {
    onSuccess: () => {
      queryClient.invalidateQueries(idTrip + "steps");
      queryClient.invalidateQueries(idStep + "days");
    },
  });

  const deleteStep = useMutation(listAPI.DeleteStep, {
    onSuccess: () => {
      queryClient.invalidateQueries(idTrip + "steps");
    },
  });

  const { isLoading, data } = useQuery(idStep + "files", () =>
    listAPI.getStep(idTrip, idStep)
  );

  if (isLoading) {
    return "loading...";
  }

  return (
    <div key={idStep} className="poiListBox" style={{ margin: "5px" }}>
      <TextField
        style={{ width: "90%", marginLeft: "5%", overflow: "hidden" }}
        InputProps={{ style: { fontSize: 30 } }}
        InputLabelProps={{ style: { fontSize: 30, disableUnderline: true } }}
        onFocus={() => setShowSave(true)}
        onBlur={() => setShowSave(false)}
        onChange={handleChangeTitle}
        id="standard-basic"
        variant="standard"
        value={newTitle}
        placeholder={"Title"}
      />
      <TextField
        style={{ width: "90%", marginLeft: "5%", overflow: "hidden" }}
        onFocus={() => setShowSave(true)}
        onBlur={() => setShowSave(false)}
        onChange={handleChangeDescription}
        id="standard-basic"
        variant="standard"
        InputProps={{ disableUnderline: true }}
        placeholder={"Description"}
        value={newDescription}
        multiline
      />
      <Grid
        container
        spacing={0}
        style={{ marginLeft: "2%", marginRight: "2%", width: "90%" }}
      >
        <Grid item xs={4} style={{ marginLeft: "3%", marginTop: "2vh" }}>
          <div>Duration :</div>
        </Grid>
        <Grid item xs={3} style={{ marginTop: "1.7vh" }}>
          <TextField
            InputProps={{ style: { width: "60px" }, disableUnderline: true }}
            InputLabelProps={{ style: { width: "60px" } }}
            onFocus={() => setShowSave(true)}
            onBlur={() => setShowSave(false)}
            onChange={handleChangeDuration}
            id="standard-basic"
            variant="standard"
            placeholder={"Duration"}
            value={newDuration}
          />
        </Grid>
        <Grid item xs={4} style={{ marginTop: "1vh" }}>
          {showSave ||
          newTitle !== title ||
          newDescription !== description ||
          newDuration !== duration ? (
            <div style={{ flexDirection: "row" }}>
              <IconButton
                style={{ color: "darkgreen" }}
                id="save"
                onClick={saveChanges}
                aria-label="save"
              >
                {" "}
                <Save />{" "}
              </IconButton>
              <IconButton
                style={{ color: "#e3b600" }}
                id="cancel"
                onClick={cancelChanges}
                aria-label="cancel"
              >
                {" "}
                <Cancel />{" "}
              </IconButton>
            </div>
          ) : null}
        </Grid>
      </Grid>

      <div
        style={{
          border: "1px solid lightgrey",
          borderRadius: "5px",
          height: "15vh",
          margin: "5px",
          minHeight: "15vh",
          maxHeight: "15vh",
          overflow: "auto",
        }}
      >
        {data.Files
          ? data.Files.map((file) => {
              return (
                <FileStep
                  idTrip={idTrip}
                  idStep={idStep}
                  idFile={file.id}
                  url={file.imageUrl}
                />
              );
            })
          : "no file"}
      </div>

      <DayList
        key={idStep}
        AddingPoiToDayId={AddingPoiToDayId}
        setAddingPoiToDayId={setAddingPoiToDayId}
        addPoiToDay={addPoiToDay}
        openModal={openModal}
        removePoiOfDay={removePoiOfDay}
        poisForDay={poisForDay}
        idStep={idStep}
        idTrip={idTrip}
      />
    </div>
  );
};

export default CardStep;
