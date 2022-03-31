import React, {useState } from "react";
import listAPI from "../../api/listApi";
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import { Button } from "@mui/material";
import { useQuery, useQueryClient,useMutation} from "react-query";
import { DeleteSweepOutlined } from "@mui/icons-material";
import "../step/StepList.css"


const POIsByStep = (idStep) => {



    const [modifyPoiTitle,setModifyPoiTitle] = useState(false);
    const [modifyPoiDescription,setModifyPoiDescription] = useState(false);

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    
    const [id,setId] = useState(0);


    // useEffect(() => {
    //     handleClose();

    // },[id]);



    const handleClose = () =>{
        setModifyPoiTitle(false)
        setModifyPoiDescription(false)
    }

    const handleModifyTitle = (id) =>{
        setModifyPoiTitle(true)
        setId(id)

    }

    const handleModifyDescription = (id) =>{
        setModifyPoiDescription(true)
        setId(id)


    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value)
      }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
      }

      const {isLoading, data : POIs} = useQuery(idStep.idStep+"StepPOIs", () => listAPI.GetPOIsFromStep(idStep.idStep));

  
      
   
   
      const queryClient = useQueryClient();
   
       const updatePoi = useMutation(listAPI.UpdatePOI, {
           onSuccess: () =>  {
               queryClient.invalidateQueries(idStep.idStep+ "StepPOIs")
               handleClose()
            } 

          
         });

         const deletePoi = useMutation(listAPI.DeletePOI, {
            onSuccess: () =>  {
                queryClient.invalidateQueries(idStep.idStep+ "StepPOIs")
                
             }  
          });

         const handleSave = (id,titleAtm,descriptionAtm) => {
            if(modifyPoiTitle && !modifyPoiDescription)
            updatePoi.mutate({
                title: title,
                description: descriptionAtm,
                id: id
              })
            if(!modifyPoiTitle && modifyPoiDescription)
              updatePoi.mutate({
                  title: titleAtm,
                  description: description,
                  id: id
                })
            if(modifyPoiTitle && modifyPoiDescription)
                updatePoi.mutate({
                    title: title,
                    description: description,
                    id: id
                  })
        }
      
     

        if (isLoading) return "Loading ..."


        else return <ul id="poiListBox">
           

           
       
        {POIs.response.map(poi => { 

           return <li key={poi.id}>

        <div id = "poiBox">
            <IconButton id = "closeIconPoi" aria-label="delete" onClick={handleClose}> <CloseIcon /> </IconButton>

            

            <div id="poiInfoBox"> 
                {(modifyPoiTitle && id == poi.id)?
                    <TextField 
                    className = "inputStyle"
                    margin = "dense"
                    id="outlined-basic" 
                    label="Poi Title" 
                    variant="outlined"
                    onChange={handleTitleChange}
                    defaultValue={poi.title}/>
                : 
                    <div id = "titleTrip"> 
                        <h2> {poi.title}</h2>
                        <IconButton id = "closeIconPoi" onClick = {() =>handleModifyTitle(poi.id)} aria-label="delete"> <AutoFixHighIcon /> </IconButton>
                    </div>
                }
                
                {(modifyPoiDescription && id == poi.id)?
                    <TextField
                        className="inputStyle"
                        margin = "dense"
                        id="outlined-textarea"
                        label="Poi Description"
                        multiline
                        rows={2}
                        onChange={handleDescriptionChange}
                        defaultValue={poi.description}/> 
                : 
                    <div id = "titleTrip"> 
                        <p>{poi.description}</p>
                        <IconButton id = "closeIconPoi" onClick = {() =>handleModifyDescription(poi.id)} aria-label="delete"> <AutoFixHighIcon /> </IconButton>
                    </div>
                }
                <Button
            onClick={() =>
              handleSave(poi.id, poi.title, poi.description)
            }
          >
           Save
          </Button>
          <Button
            onClick={() =>
                deletePoi.mutate(poi.id)
              
            }
          >
           Delete
          </Button>
      
            </div>
                
               

        </div>


        </li>
            

            }
              ) 
}
        </ul>

   

       

    



}

export default POIsByStep;