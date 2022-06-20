import React, { useState } from "react";
import {
  InputAdornment,
  FormControl,
  InputLabel,
  Input,
  Button,
  MenuItem,
  TextField,
  IconButton,
  Modal,
} from "@mui/material";
import { DeleteForever, Close, Save } from "@mui/icons-material";
import DeleteModal from "./DeleteModal";
import { useMutation, useQueryClient } from "react-query";
import listAPI from "../../api/listApi";
import Slide from "@mui/material/Slide";
import "./PoiModal.css";
import { UploadFile } from "@mui/icons-material";

const PoiModal = ({
  id,
  title,
  description,
  closePOI,
  idTrip,
  openUpdatePOINotification,
  openDeletePOINotification,
  openPoiFromDay,
}) => {
  const queryClient = useQueryClient();

  const [poiTitle, setPoiTitle] = useState(title ? title : "");
  const [poiDescription, setPoiDescription] = useState(
    description ? description : ""
  );
  const [idPOI, setIdPOI] = useState(id);

  if (id != idPOI) {
    setIdPOI(id);
    setPoiTitle(title ? title : "");
    setPoiDescription(description ? description : "");
  }

  //file for poi

  const handlePoiTitleChange = (event) => {
    setPoiTitle(event.target.value);
  };

  const handlepoiDescriptionChange = (event) => {
    setPoiDescription(event.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const updatePOI = useMutation(listAPI.UpdatePOI, {
    onSuccess: () => {
      queryClient.invalidateQueries(idTrip + "POIs");
      handleClose();
      openUpdatePOINotification(TransitionUp);
    },
  });

  const deletePoi = useMutation(listAPI.DeletePOI, {
    onSuccess: () => {
      queryClient.invalidateQueries(idTrip + "POIs");
      handleClose();
      closePOI();
      openDeletePOINotification(TransitionUp);
    },
  });

  const updatePOIOnClick = () => {
    updatePOI.mutate({
      id: id,
      title: poiTitle,
      description: poiDescription,
      tripId: idTrip,
    });
  };

  const [file, setFile] = useState();

  return (
    <div id="ModalBox" className="ModalBox">
      <IconButton
        style={{ color: "darkred" }}
        id="closeIcon"
        onClick={closePOI}
        aria-label="delete"
      >
        <Close />
      </IconButton>
      <div className="PoiInputs">
        <TextField
          className="PoiInput"
          margin="dense"
          variant="standard"
          id="basic"
          placeholder="Title"
          value={poiTitle}
          onChange={handlePoiTitleChange}
        />
        <TextField
          className="PoiInput"
          margin="dense"
          variant="outlined"
          id="textarea"
          placeholder="Set a description"
          multiline
          rows={5}
          value={poiDescription}
          onChange={handlepoiDescriptionChange}
        />
      </div>

      {file ? file.name : "no file given"}

      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          style={{ display: "none" }}
        />
        {/* <Button variant="contained" component="span"> Upload Files </Button> */}
      </label>

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
        <IconButton component={"span"} id="uploadFile" aria-label="uploadFile">
          {" "}
          <UploadFile />{" "}
        </IconButton>
      </label>

      <div className="BtnBox">
        <IconButton
          style={{ color: "darkred" }}
          id="DeleteIcon"
          onClick={handleOpen}
          aria-label="delete"
        >
          <DeleteForever />
        </IconButton>
        <IconButton
          style={{ color: "darkgreen" }}
          id="SaveIcon"
          onClick={updatePOIOnClick}
          aria-label="save"
        >
          <Save />
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
                deletePoi.mutate({
                  tripId: idTrip,
                  id: id,
                });
              }}
              noBtnFunction={handleClose}
              type="marker"
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PoiModal;
