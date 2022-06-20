import React, { useState } from "react";
import Input from "@mui/material/Input";
import DeleteModal from "./DeleteModal";
import Modal from "@mui/material/Modal";
import { useMutation, useQueryClient } from "react-query";
import listAPI from "../../api/listApi";
import IconButton from "@mui/material/IconButton";
import { DeleteForever, UploadFile, Close } from "@mui/icons-material";
import "./StepModal.css";
import CardStep from "../step/CardStep";
import { Button } from "@mui/material";
import { Save } from "@mui/icons-material";

const StepModal = ({
  id,
  title,
  description,
  duration,
  closeStep,
  idTrip,
  poisForDay,
  removePoiOfDay,
  openModal,
  addPoiToDay,
  AddingPoiToDayId,
  setAddingPoiToDayId,
  refetchRides,
}) => {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteStep = useMutation(listAPI.DeleteStep, {
    onSuccess: () => {
      queryClient.invalidateQueries(idTrip + "steps");
      closeStep();
      refetchRides();
    },
  });

  const [file, setFile] = useState();

  const createStepFile = useMutation(
    () => listAPI.CreateStepFile(idTrip, id, file),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(id + "files");
        refetchRides();
      },
    }
  );

  const handleFileUpload = () => {
    createStepFile.mutate({
      idTrip: idTrip,
      id: id,
      file: file,
    });
  };

  return (
    <div className="StepModalBox">
      <IconButton
        style={{ color: "darkred" }}
        id="closeIcon"
        onClick={closeStep}
        aria-label="delete"
      >
        {" "}
        <Close />{" "}
      </IconButton>
      <CardStep
        key={id}
        AddingPoiToDayId={AddingPoiToDayId}
        setAddingPoiToDayId={setAddingPoiToDayId}
        addPoiToDay={addPoiToDay}
        openModal={openModal}
        removePoiOfDay={removePoiOfDay}
        poisForDay={poisForDay}
        idTrip={idTrip}
        idStep={id}
        title={title}
        description={description}
        duration={duration}
        file={file ? file : "no file given"}
      />

      <div className="BtnBox">
        <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
            onSubmit={(e) => e.preventDefault()}
          />
          <Button variant="plain" component="span">
            <UploadFile />

            {file ? file.name : "no file given"}
          </Button>
          <Button variant="plain" onClick={handleFileUpload}>
            <Save />
          </Button>
        </label>

        <IconButton
          style={{ color: "darkred" }}
          id="uploadFile"
          onClick={handleOpen}
          aria-label="uploadFile"
        >
          {" "}
          <DeleteForever />{" "}
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <div className="deleteModal">
            <DeleteModal
              yesBtnFunction={() => {
                deleteStep.mutate({
                  id: id,
                  tripId: idTrip,
                });
                handleClose();
              }}
              noBtnFunction={handleClose}
              type="step"
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default StepModal;
