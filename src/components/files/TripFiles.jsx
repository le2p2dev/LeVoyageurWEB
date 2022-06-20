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

import FileCard from './FileCard'
import { FileUpload, UploadFile } from "@mui/icons-material";

const TripFiles = ({ idTrip }) => {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState();

  const { isLoading, data } = useQuery(idTrip + "files", () => listAPI.GetTrip(idTrip));

  const createFile =
    useMutation(() => listAPI.AddFileToTrip(idTrip,selectedFile), {
      onSuccess: () => {
        queryClient.invalidateQueries(idTrip+"files")
      }
    })
  

  const handleUpload = (e) => {
    console.log(selectedFile);
    createFile.mutate({idTrip: idTrip, selectedFile: selectedFile})
    e.preventDefault();
  };

  if (isLoading) {
    return "Loading..";
  } else {
   data.Files.map( (file) => {
    console.log(file);
   })
  }

  return (
    <div style={{ marginLeft: "4%", width: "100%" }}>
      <h2>My files</h2>

      <label>
        <Input
          sx={{ display: "none" }}
          accept="image/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          onSubmit={(e) => e.preventDefault()}
        />
        <Button variant="contained" component="span">
          {selectedFile ? selectedFile.name : "No file chosen"}
        </Button>
      </label>

      
      <IconButton onClick={handleUpload}>
        <FileUpload />
      </IconButton>

      <div>
        {data.Files.map( (file, i) => {
        return (<FileCard url={file.imageUrl}  idFile={file.id} idTrip={idTrip} />)
      })}
      </div>
    </div>
  );
};

export default TripFiles;