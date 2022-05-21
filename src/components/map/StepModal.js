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
import "./StepModal.css";
import { DeleteSweepOutlined } from "@mui/icons-material";
import CardStep from "../step/CardStep";

const StepModal = ({id,title,description,duration,closeStep,idTrip,poisForDay,removePoiOfDay,openModal}) => {


    const queryClient = useQueryClient();
   
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };


    const deleteStep = useMutation(listAPI.DeleteStep, {
        onSuccess: () =>  {
            queryClient.invalidateQueries(idTrip+ "steps")
            closeStep()
            
         }  
      });

    return (
        
        <div id = "ModalBox">
            <IconButton id = "closeIcon" onClick = {closeStep} aria-label="delete"> <CloseIcon /> </IconButton>
            <CardStep key={id} openModal={openModal} removePoiOfDay={removePoiOfDay} poisForDay={poisForDay} idTrip={idTrip} idStep={id} title={title} description={description} duration={duration} />


                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file"  style = { {display:'none'}}/>
                    {/* <Button variant="contained" component="span"> Upload Files </Button> */}
                </label>

            <div className = "BtnBox">
                <Button onClick={handleOpen} variant="contained">Delete Step</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="parent-modal-title"
                    aria-describedby="parent-modal-description">
                        <div className = "deleteModal">
                            <DeleteModal 
                                yesBtnFunction =  {() => {
                                    deleteStep.mutate({
                                        id : id,
                                        tripId : idTrip})
                                    handleClose()
                                }
                                }
                                    
                                noBtnFunction = {handleClose} 
                                type = "step"
                            />
                        </div>
                </Modal>
            </div>
        </div>
    );
}

export default StepModal;