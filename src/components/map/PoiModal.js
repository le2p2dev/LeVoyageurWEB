import React, {useState } from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
// import DeleteIcon from '@mui/material/DeleteIcon';
import Input from '@mui/material/Input';
import DeleteModal from "./DeleteModal";
import Modal from '@mui/material/Modal';

import "./PoiModal.css";

const PoiModal = () => {

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    return(
        <div id = "PoiModalBox">
            
            <div id = "PoiInputs"> 
                <TextField 
                    required
                    className = "PoiInput"
                    margin = "dense"
                    id="outlined-basic" 
                    label="POI Title" 
                    variant="outlined" />
                <TextField
                    className = "PoiInput"
                    margin = "dense"
                    id="outlined-textarea"
                    label="POI Description"
                    placeholder="Placeholder"
                    multiline
                    rows={5}
                />
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
                <Button variant="contained">Save POI</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description">
                        <div className = "deleteModal">
                            <DeleteModal 
                                yesBtnFunction =  {() =>
                                    {console.log("TODO modify marker");
                                    handleClose();}}
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