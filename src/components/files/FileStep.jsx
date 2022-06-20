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

const FileStep = ({ idTrip,idStep,idFile, url }) => {

  const queryClient = useQueryClient();


  const [selectedFile, setSelectedFile] = useState();

  const [DeleteModal,setDeleteModal] = useState(false);


const openDeleteModal = () => {
    setDeleteModal(true)
}
const closeDeleteModal = () => {
    setDeleteModal(false)
}

const deleteFile =
    useMutation(() => listAPI.DeleteStepFile(idTrip,idStep,idFile), {
      onSuccess: () => {
        console.log('file delete');
        queryClient.invalidateQueries(idStep+"files")
      }
    })

const deleteFilef = () => {
    
    deleteFile.mutate({idTrip:idTrip,idStep:idStep,idFile: idFile})
    setDeleteModal(false)
}

const fileName =  url.substring(url.lastIndexOf('/')+1).slice(13).split('.').slice(0, -1).join('.')

  return (
    <div style={{ marginLeft: "4%", width: "100%" }}>
     <Button variant="text" href={url} >{fileName}</Button>
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
          <Button onClick={deleteFilef}>Yes</Button>
          <Button onClick={closeDeleteModal}>No</Button>
        </Box>
      </Modal>
      </div>
  );
};

export default FileStep;
