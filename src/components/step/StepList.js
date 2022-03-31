import React, {useEffect, useState } from "react";
import listAPI from "../../api/listApi";
import { Button, Select, Autocomplete, Box} from "@mui/material";
import "./StepList.css"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import { useQuery, useMutation,useQueryClient } from "react-query";
import POIsbyStep from "../POI/POIsByStep"



const StepList = (idTrip) => {

    const {isLoading, data : steps} = useQuery(idTrip.idTrip+ "steps", () => listAPI.GetStepsFromTrip(idTrip.idTrip))
    const {isLoading : isLoadingAllPOIs, data : allPOIs} = useQuery(idTrip.idTrip+"POIs", () => listAPI.GetPOIsFromTrip(idTrip.idTrip));


    const queryClient = useQueryClient();

    const updateStep = useMutation(listAPI.UpdateStep, {
        onSuccess: () => {
            queryClient.invalidateQueries(idTrip.idTrip + "steps")
            handleClose()
        }
      });

      const deleteStep = useMutation(listAPI.DeleteStep, {
        onSuccess: () => {
            queryClient.invalidateQueries(idTrip.idTrip + "steps")
            handleClose()
        }
      });

    const [modifyStepTitle,setModifyStepTitle] = useState(false);
    const [modifyStepDescription,setModifyStepDescription] = useState(false);

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    
    const [id,setId] = useState(0);

    const [idPoiToAdd,setIdPoiToAdd] = useState("");


    // useEffect(() => {
    //     handleClose();

    // },[id]);



    const handleClose = () =>{
        setModifyStepTitle(false)
        setModifyStepDescription(false)
    }

    const handleModifyTitle = (id) =>{
        setModifyStepTitle(true)
        setId(id)

    }

    const handleModifyDescription = (id) =>{
        setModifyStepDescription(true)
        setId(id)


    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
      }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
      }
    
    const handleSave = (id,titleAtm,descriptionAtm) => {
        if(modifyStepTitle && !modifyStepDescription)
        updateStep.mutate({
            title: title,
            description: descriptionAtm,
            id: id
          })
        if(!modifyStepTitle && modifyStepDescription)
          updateStep.mutate({
              title: titleAtm,
              description: description,
              id: id
            })
        if(modifyStepTitle && modifyStepDescription)
            updateStep.mutate({
                title: title,
                description: description,
                id: id
              })
    }
    const handleSelectPoi = (event) =>{
        setIdPoiToAdd(event.target.value)
    }

        if (isLoading || isLoadingAllPOIs) return "Loading ..."


        else return <div>
           

           
       
        {steps.response.map(step => { 

           return <div key={step.id} id = "stepListBox">

            

            <div id="stepInfoBox"> 

                {(modifyStepTitle && id == step.id)?
                    <TextField 
                    className = "inputStyle"
                    margin = "dense"
                    id="outlined-basic" 
                    label="Step Title" 
                    variant="outlined"
                    onChange={handleTitleChange}
                    defaultValue={step.title}/>
                : 
                    <div id = "titleTrip"> 
                        <h2> {step.title}</h2>
                        <IconButton id = "closeIconStep" onClick = {() =>handleModifyTitle(step.id)} aria-label="delete"> <EditIcon /> </IconButton>
                    </div>
                }
                
                {(modifyStepDescription && id == step.id)?
                    <TextField
                        className="inputStyle"
                        margin = "dense"
                        id="outlined-textarea"
                        label="Step Description"
                        multiline
                        rows={2}
                        onChange={handleDescriptionChange}
                        defaultValue={step.description}/> 
                : 
                    <div id = "titleTrip"> 
                        <p>{step.description}</p>
                        <IconButton id = "closeIconStep" onClick = {() =>handleModifyDescription(step.id)} aria-label="delete"> <EditIcon /> </IconButton>
                    </div>
                }
                <IconButton id = "closeIconStep" aria-label="delete" onClick={handleClose}> <CloseIcon /> </IconButton>
               <div id="poiListBox">
                <Button
            onClick={() =>
             handleSave(step.id,step.title,step.description)
            }
          >
              
           Save
          </Button>
          
          <Button
            onClick={() =>
                deleteStep.mutate(step.id)
              
            }
          >
           Delete
          </Button>
          </div>
          
            { <Autocomplete
                disablePortal
                options={allPOIs.response}
                getOptionLabel={(option) => option.title ? option.title : "Poi avec l'id :"+option.id}
                sx={{ width: 300 }}
                renderOption={(props, option) => (
                    <Box component="li" {...props}>
                     
                       {option.title ? option.title : option.id} 
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                    onChange={handleSelectPoi}

                      {...params}
                      label="Add a poi to the step"
                      inputProps={{
                        ...params.inputProps,
                      }}
                      />
                )}
            /> }
            </div>
            
                <div>
                  <POIsbyStep idStep= {step.id}/>
                </div>

        </div>
            }
              ) 
}
        </div>

   

       

    


}


export default StepList;
