import React, {useState } from "react";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import DeleteModal from "./DeleteModal";
import Modal from '@mui/material/Modal';
import {useMutation, useQueryClient} from "react-query";
import listAPI from "../../api/listApi";
import IconButton from '@mui/material/IconButton';
import {DeleteForever, UploadFile, Close} from '@mui/icons-material';
import "./StepModal.css";
import CardStep from "../step/CardStep";

const StepModal = ({id,title,description,duration,closeStep,idTrip,poisForDay,removePoiOfDay,openModal,addPoiToDay}) => {


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
        
        <div className="StepModalBox">
            <IconButton id = "closeIcon" onClick = {closeStep} aria-label="delete"> <Close /> </IconButton>
            <CardStep key={id} addPoiToDay={addPoiToDay} openModal={openModal} removePoiOfDay={removePoiOfDay} poisForDay={poisForDay} idTrip={idTrip} idStep={id} title={title} description={description} duration={duration} />

            <div className = "BtnBox">
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" multiple type="file"  style = {{display:'none'}}/>
                    <IconButton id = "uploadFile" aria-label="uploadFile"> <UploadFile /> </IconButton>
                </label>

                <IconButton id = "uploadFile" onClick={handleOpen} aria-label="uploadFile"> <DeleteForever /> </IconButton>
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