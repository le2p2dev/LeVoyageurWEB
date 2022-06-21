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
import { useQuery, useMutation, useQueryClient } from "react-query";
import listAPI from "../../api/listApi";
import Slide from "@mui/material/Slide";
import "./PoiModal.css";
import { UploadFile } from "@mui/icons-material";
import PoiFile from "../files/PoiFile";

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

  const { isLoading, data } = useQuery(idPOI + "files", () =>
    listAPI.GetPoi(idTrip, idPOI)
  );

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

  // => send file
  const createFile = useMutation(
    () => listAPI.AddFileToPoi(idTrip, idPOI, file),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(idPOI + "files");
      },
    }
  );
  const updatePOIOnClick = () => {
    createFile.mutate({
      idTrip: idTrip,
      idPoi: idPOI,
      file: file,
    });
    updatePOI.mutate({
      id: id,
      title: poiTitle,
      description: poiDescription,
      tripId: idTrip,
    });
  };

  const [file, setFile] = useState(0);

  if (isLoading) {
    return "...";
  }
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
          label="Title"
          value={poiTitle}
          onChange={handlePoiTitleChange}
        />
        <TextField
          className="PoiInput"
          margin="dense"
          variant="outlined"
          id="textarea"
          label="Description"
          multiline
          rows={4}
          value={poiDescription}
          onChange={handlepoiDescriptionChange}
        />

        <div
          style={{
            border: "1px solid lightgrey",
            borderRadius: "5px",
            overflow: "auto",
            minHeight: "15vh",
            maxHeight: "15vh",
          }}
        >
          {data.Files
            ? data.Files.map((file, i) => {
                return (
                  <PoiFile
                    key={i}
                    idFile={file.id}
                    idPoi={idPOI}
                    idTrip={idTrip}
                    url={file.imageUrl}
                  />
                );
              })
            : ""}
        </div>
      </div>

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

      <div className="BtnBox">
        <label>
          <Input
            sx={{ display: "none" }}
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            onSubmit={(e) => e.preventDefault()}
          />
          <Button variant="plain" component="span" style={{ marginTop: "1%" }}>
            <UploadFile />
            {file ? file.name : "no file given"}
          </Button>
        </label>
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
