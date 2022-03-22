import React, {useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import DeleteModal from "./DeleteModal";
import Modal from '@mui/material/Modal';
import {useMutation, useQueryClient} from "react-query";
import listAPI from "../../api/listApi";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


import "./PoiModal.css";

const PoiModal = ({id,title,description,closePOI,idTrip}) => {

    
    const queryClient = useQueryClient();
    
    const [poiTitle, setPoiTitle] = useState(title ? title : "test");
    const [poiDescription,setPoiDescription] = useState("");
    const [idPOI,setIdPOI] = useState(id);

    if (id!=idPOI){
        setIdPOI(id)
        setPoiTitle(title ? title : "")
        setPoiDescription(description ? description : "")
    }




    const handlePoiTitleChange = (event) => {
        setPoiTitle(event.target.value);
    };

    const handlepoiDescriptionChange = (event) => {
        setPoiDescription(event.target.value);
    };

   
    
    

    const categories = [
        {   
            value:"Museum",
            label: 'Museum',
        },
        {
            value: "Hotel",
            label: 'Hotel',
        },
        {
            value:"Restaurant",
            label: 'Restaurant',
        },
        {
            value:"Monument",
            label: 'Monument',
        },
    ];

    const [category, setCategory] = useState('Hotel');

    const handleCategory = (event) => {
        setCategory(event.target.value);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };


    const updatePOI = useMutation(listAPI.UpdatePOI, {
        onSuccess: () => queryClient.invalidateQueries(idTrip + "POIs")

    });

    const updatePOIOnClick = () => {

        updatePOI.mutate({
            id: id,
            title: poiTitle,
            description: poiDescription,
        });
        
    }
    
    

    
    return (
        
  
        
        <div id = "PoiModalBox">
            <IconButton id = "closeIcon" onClick = {closePOI} aria-label="delete"> <CloseIcon /> </IconButton>
            <div id = "PoiInputs"> 
                <TextField 
                    required
                    className = "PoiInput"
                    margin = "dense"
                    id="outlined-basic" 
                    label="POI Title" 
                    variant="outlined"
                    value={poiTitle} 
                    onChange={handlePoiTitleChange} />
                <TextField
                    className = "PoiInput"
                    margin = "dense"
                    id="outlined-textarea"
                    label="POI Description"
                    placeholder="Placeholder"
                    multiline
                    rows={5}
                    value={poiDescription}
                    onChange={handlepoiDescriptionChange}/>
                <TextField
                    className = "PoiInput"
                    margin = "dense"
                    id="outlined-select-currency"
                    select
                    label="POI Category"
                    value={category}
                    onChange={handleCategory}>
                    {categories.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file"  style = { {display:'none'}}/>
                    <Button variant="contained" component="span"> Upload Files </Button>
                </label>

            <div className = "BtnBox">
                <Button onClick={handleOpen} variant="contained">Delete POI</Button>
                <Button onClick={updatePOIOnClick}variant="contained">Save POI</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description">
                        <div className = "deleteModal">
                            <DeleteModal 
                                yesBtnFunction =  {() =>
                                    handleClose(closePOI)}
                                noBtnFunction = {handleClose} 
                                type = "marker"
                            />
                        </div>
                </Modal>
            </div>
        </div>
    );
}

export default PoiModal;