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
import { useQuery, useMutation, useQueryClient } from "react-query";
import listAPI from "../../api/listApi";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteModal from "../map/DeleteModal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const TripFiles = ({ idTrip,idFile, url }) => {
  const [selectedFile, setSelectedFile] = useState();

  const [DeleteModal,setDeleteModal] = useState(false);


const openDeleteModal = () => {
    setDeleteModal(true)
}
const closeDeleteModal = () => {
    setDeleteModal(false)
}

const deleteFile = () => {
    console.log('file delete');
    listAPI.deleteFile(idTrip,idFile)
    setDeleteModal(false)
}
 
  return (
    <div style={{ marginLeft: "4%", width: "100%" }}>
     <Button variant="text" href={url} >Image</Button>
     <IconButton onClick={openDeleteModal}> <DeleteForeverIcon /></IconButton>
    

     <Modal
        open={DeleteModal}
        onClose={closeDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Delete the file
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Delete the file ?
          </Typography>
          <Button onClick={deleteFile}>Yes</Button>
          <Button onClick={closeDeleteModal}>No</Button>
        </Box>
      </Modal>
      </div>
  );
};

export default TripFiles;
