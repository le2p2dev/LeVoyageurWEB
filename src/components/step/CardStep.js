import React, {useState } from "react";
import { useMutation, useQueryClient  } from "react-query";
import listAPI from "../../api/listApi";
import PoiList from "../POI/PoiList";
import {Button, Switch, TextField} from "@mui/material";

const CardStep = ({idTrip,id,title,description,idStep}) => {



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

const queryClient = useQueryClient();

const updateStep = useMutation(listAPI.UpdateStep, {
    onSuccess: () => {
        queryClient.invalidateQueries(idTrip + "steps")
    }
  });

  const deleteStep = useMutation(listAPI.DeleteStep, {
    onSuccess: () => {
        queryClient.invalidateQueries(idTrip.idTrip + "steps")
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
            defaultValue={title}
            placeholder={"title"}/>
        <br />
        <TextField 
            onFocus={() =>setShowSave(true)}
            onBlur={() => setShowSave(false)}
            onChange={handleChangeDescription}
            id="standard-basic"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            placeholder={"description"}
            defaultValue={description}/>
        
        {showSave || newTitle!==title || newDescription!==description ? 
        <Button
        variant="normal"
        onClick={saveChanges}

        >
            Save
        </Button>

         :null}

        



        <PoiList idStep={idStep} />

    </div>
}

export default CardStep