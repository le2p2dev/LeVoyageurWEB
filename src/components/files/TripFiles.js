import React, {useState } from "react";
import { InputAdornment, FormControl, InputLabel, Input, Button, MenuItem, TextField, IconButton, Modal } from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import listAPI from "../../api/listApi";


const TripFiles = ({idTrip}) => {

    const [selectedFile, setSelectedFile] = useState();

   
    const handleUpload = e => {
        
        console.log(selectedFile);
        listAPI.AddFileToTrip(idTrip,selectedFile).then( (data)=>  console.log(data) )
        e.preventDefault();
      };

    return(

        <div style={{marginLeft: "4%", width: "100%"}}>
            <h2>My files</h2>
            <form>
                <input
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                    onSubmit={(e) => e.preventDefault()}
                    />
                
                <button  onClick={handleUpload} >AA</button>
                <p>{selectedFile ? selectedFile.name : "KKS"}</p>
            </form>

                {/* <Input accept="image/*" id="contained-button-file" multiple type="file"  />
                <Button variant="contained" component="span"> Upload Files </Button> */}
        </div>

    );

}

export default TripFiles;