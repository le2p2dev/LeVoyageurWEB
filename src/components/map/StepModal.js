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
import { DeleteSweepOutlined } from "@mui/icons-material";

const StepModal = ({id,title,description,closeStep,idTrip}) => {


    const queryClient = useQueryClient();
    
    const [stepTitle, setStepTitle] = useState(title ? title : "test");
    const [stepDescription,setStepDescription] = useState("");
    const [idStep,setIdStep] = useState(id);

    if (id!=idStep){
        setIdStep(id)
        setStepTitle(title ? title : "")
        setStepDescription(description ? description : "")
    }


    const handleStepTitleChange = (event) => {
        setStepTitle(event.target.value);
    };

    const handleStepDescriptionChange = (event) => {
        setStepDescription(event.target.value);
    };

  
   
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };


    const updateStep = useMutation(listAPI.UpdateStep, {
        onSuccess: () => queryClient.invalidateQueries(idTrip + "steps")

    });

    const deleteStep = useMutation(listAPI.DeleteStep, {
        onSuccess: () =>  {
            queryClient.invalidateQueries(idTrip+ "steps")
            closeStep()
            
         }  
      });

    const updateStepOnClick = () => {
        
        updateStep.mutate({
            id: id,
            title: stepTitle,
            description: stepDescription,
        });
        
    }
    
    

    
    return (
        
  
        
        <div id = "PoiModalBox">
            <IconButton id = "closeIcon" onClick = {closeStep} aria-label="delete"> <CloseIcon /> </IconButton>
            <div id = "PoiInputs"> 
                <TextField 
                    required
                    className = "PoiInput"
                    margin = "dense"
                    id="outlined-basic" 
                    label="Step Title" 
                    variant="outlined"
                    value={stepTitle} 
                    onChange={handleStepTitleChange} />
                <TextField
                    className = "PoiInput"
                    margin = "dense"
                    id="outlined-textarea"
                    label="Step Description"
                    placeholder="Placeholder"
                    multiline
                    rows={5}
                    value={stepDescription}
                    onChange={handleStepDescriptionChange}/>
            </div>

                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file"  style = { {display:'none'}}/>
                    {/* <Button variant="contained" component="span"> Upload Files </Button> */}
                </label>

            <div className = "BtnBox">
                <Button onClick={handleOpen} variant="contained">Delete Step</Button>
                <Button onClick={updateStepOnClick}variant="contained">Save Step</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description">
                        <div className = "deleteModal">
                            <DeleteModal 
                                yesBtnFunction =  {() => {
                                    deleteStep.mutate(id)
                                    handleClose()
                                }
                                }
                                    
                                noBtnFunction = {handleClose} 
                                type = "marker"
                            />
                        </div>
                </Modal>
            </div>
        </div>
    );
}

export default StepModal;