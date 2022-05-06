import React, {useState } from "react";
import { useMutation, useQueryClient  } from "react-query";
import listAPI from "../../api/listApi";
import Day from "../day/Day";
import DayList from "../day/DayList";
import {Button, duration, Switch, TextField} from "@mui/material";

const CardStep = ({idTrip,title,description,duration,idStep, poisForDay, removePoiOfDay}) => {


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
    }
  });

  const deleteStep = useMutation(listAPI.DeleteStep, {
    onSuccess: () => {
        queryClient.invalidateQueries(idTrip + "steps")
    }
  });




    return <div key={idStep} style={{border: "2px solid black"}} >
        <TextField 
            onFocus={() => setShowSave(true)}
            onBlur={() => setShowSave(false)}
            onChange={handleChangeTitle}
            id="standard-basic"
            InputProps={{ disableUnderline: true }}
            variant="standard"
            value={newTitle}
            placeholder={"title"}/>
        <br />
        <TextField 
            onFocus={() => setShowSave(true)}
            onBlur={() => setShowSave(false)}
            onChange={handleChangeDescription}
            id="standard-basic"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            placeholder={"description"}
            value={newDescription}
            multiline/>
        <TextField 
            onFocus={() => setShowSave(true)}
            onBlur={() => setShowSave(false)}
            onChange={handleChangeDuration}
            id="standard-basic"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            placeholder={"duration"}
            value={newDuration}
            multiline/>
        
        {showSave || newTitle!==title || newDescription!==description || newDuration!==duration ? 
            <div>
               <Button
        variant="normal"
        onClick={saveChanges}

        >
            Save
        </Button>

        <Button
        variant="normal"
        onClick={cancelChanges}

        >
            Cancel
        </Button>

        </div>

        

         :null}

        <DayList key={idStep} removePoiOfDay={removePoiOfDay} poisForDay={poisForDay} idStep={idStep} idTrip={idTrip} />  

    </div>
}

export default CardStep