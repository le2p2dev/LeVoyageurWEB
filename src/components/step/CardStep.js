import React, {useState } from "react";
import { useMutation, useQueryClient  } from "react-query";
import listAPI from "../../api/listApi";
import Day from "../day/Day";
import {Button, Switch, TextField} from "@mui/material";

const CardStep = ({idTrip,id,title,description,idStep, poisForDay, removePoiOfDay}) => {


!title ? title="" : title = title
!description ? description="" : description = description

const [newTitle,setNewTitle] = useState(title);
const [newDescription,setNewDescription] = useState(description);
const [showSave,setShowSave] = useState(false);


const handleChangeTitle = (event) => {
    setNewTitle(event.target.value)
}
const handleChangeDescription = (event) => {
    setNewDescription(event.target.value)
} 

const saveChanges = () => {
    updateStep.mutate({
        title: newTitle,
        description: newDescription,
        id: id
      })
}

const cancelChanges = () => {
    setShowSave(false)
    setNewTitle(title ? title : "")
    setNewDescription(description ? description : "")
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




    return <div key={id} style={{border: "2px solid red"}} >
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
        
        {showSave || newTitle!==title || newDescription!==description ? 
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

        <Day key={id} removePoiOfDay={removePoiOfDay} poisForDay={poisForDay} idStep={id} />  

    </div>
}

export default CardStep