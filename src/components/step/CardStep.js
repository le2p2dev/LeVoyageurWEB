import React, {useState } from "react";
import { useMutation, useQueryClient  } from "react-query";
import listAPI from "../../api/listApi";
import "./StepList.css"
import DayList from "../day/DayList";
import IconButton from '@mui/material/IconButton';
import {Save, Cancel, Close} from '@mui/icons-material';
import {Button, TextField} from "@mui/material";

const CardStep = ({idTrip,title,description,duration,idStep, poisForDay, removePoiOfDay, openModal,addPoiToDay}) => {


!title ? title="" : title = title
!description ? description="" : description = description
!duration ? duration=0 : duration = duration


const [newTitle,setNewTitle] = useState(title);
const [newDescription,setNewDescription] = useState(description);
const [newDuration,setNewDuration] = useState(duration);

const [showSave,setShowSave] = useState(false);


const handleChangeTitle = (event) => {
    setNewTitle(event.target.value)
}
const handleChangeDescription = (event) => {
    setNewDescription(event.target.value)
} 
const handleChangeDuration = (event) => {
    setNewDuration(event.target.value)
}

const saveChanges = () => {
    updateStep.mutate({
        title: newTitle,
        description: newDescription,
        duration: newDuration,
        id: idStep,
        tripId : idTrip
      })
}

const cancelChanges = () => {
    setShowSave(false)
    setNewTitle(title ? title : "")
    setNewDescription(description ? description : "")
    setNewDuration(duration ? duration : 0)
}

const queryClient = useQueryClient();

const updateStep = useMutation(listAPI.UpdateStep, {
    onSuccess: () => {
        queryClient.invalidateQueries(idTrip + "steps")
        queryClient.invalidateQueries(idStep + "days")
    }
  });

  const deleteStep = useMutation(listAPI.DeleteStep, {
    onSuccess: () => {
        queryClient.invalidateQueries(idTrip + "steps")
    }
  });




    return <div key={idStep} className="poiListBox" >
        <TextField 
            style={{width: "90%", marginLeft: "5%", overflow: "hidden"}}
            InputProps={{ style: { fontSize: 30 } }}
            InputLabelProps={{ style: { fontSize: 30, disableUnderline: true }}}
            onFocus={() => setShowSave(true)}
            onBlur={() => setShowSave(false)}
            onChange={handleChangeTitle}
            id="standard-basic"
            variant="standard"
            value={newTitle}
            placeholder={"Title"}/>
        <TextField 
            style={{width: "90%", marginLeft: "5%", overflow: "hidden"}}
            onFocus={() => setShowSave(true)}
            onBlur={() => setShowSave(false)}
            onChange={handleChangeDescription}
            id="standard-basic"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            placeholder={"Description"}
            value={newDescription}
            multiline/>
            <div style={{flexDirection: "row"}}>
                <p>Duration :</p>
                <TextField 
                    InputProps={{ style: {width: "60px"}, disableUnderline: true }}
                    InputLabelProps={{ style: {width: "60px"}}}
                    onFocus={() => setShowSave(true)}
                    onBlur={() => setShowSave(false)}
                    onChange={handleChangeDuration}
                    id="standard-basic"
                    variant="standard"
                    placeholder={"Duration"}
                    value={newDuration}/>
            </div>
        
        {showSave || newTitle!==title || newDescription!==description || newDuration!==duration ? 
        <div style={{flexDirection: "row"}}>
            <IconButton id = "save" onClick={saveChanges} aria-label="save"> <Save /> </IconButton>
            <IconButton id = "cancel" onClick={cancelChanges} aria-label="cancel"> <Cancel /> </IconButton>
        </div>
         :null}

        <DayList key={idStep} addPoiToDay={addPoiToDay} openModal={openModal} removePoiOfDay={removePoiOfDay} poisForDay={poisForDay} idStep={idStep} idTrip={idTrip} />  

    </div>
}

export default CardStep