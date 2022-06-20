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

const TripFiles = ({ idTrip }) => {
  const [selectedFile, setSelectedFile] = useState();

  const { isLoading, data } = useQuery(idTrip + "trip", () => listAPI.GetTrip(idTrip));

  const handleUpload = (e) => {
    console.log(selectedFile);
    listAPI
      .AddFileToTrip(idTrip, selectedFile)
      .then((data) => console.log(data));
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
          Upload a file
        </Button>
      </label>

      <Button onClick={handleUpload}>Save uploaded files</Button>
    

      <div>
        {data.Files.map( (file, i) => {
        return (<FileCard url={file.imageUrl} idFile={file.id} idTrip={idTrip} />)
      })}
      </div>

      

      {/* <Input accept="image/*" id="contained-button-file" multiple type="file"  />
                <Button variant="contained" component="span"> Upload Files </Button> */}
    </div>
  );
};

export default TripFiles;
