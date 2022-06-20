import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import listAPI from "../../api/listApi";

//mui import
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";


const CardTrip = ({ id, name, description, background }) => {
  const navigate = useNavigate();

  const [shadow, setShadow] = useState("black");
  const [borderLine, setBorderLine] = useState("");
  const [modify, setModify] = useState(false);

  const queryClient = useQueryClient();
  const [newName, setTripName] = useState(name ? name : "");
  const [newDescription, setDescription] = useState(description ? description : "" );
  const [newBackground, setBackground] = useState(background ? background : "" );


  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleTripNameChange = (event) => {
    setTripName(event.target.value);
  };

  const handleBackgroundChange = (event) => {
    setBackground(event.target.value);
  };

  const modifyTrip = useMutation(listAPI.UpdateTrip, {
    onSuccess: () => queryClient.invalidateQueries(1 + "trips"),
  });
  const deleteTrip = useMutation(listAPI.DeleteTrip, {
    onSuccess: () => queryClient.invalidateQueries(1 + "trips"),
  });

  const saveTrip = () => {
    modifyTrip.mutate({id,
      tripName: newName,
      description: newDescription,
      background : newBackground
    })
      setModify(false)
    
  }

  const handleDelete = () => {
    deleteTrip.mutate(id)
  }


  const changeOver = () => {
    setShadow("#1876D1")
    setBorderLine("2px solid #1876D1")
  }
  const changeOut = () => {
    setShadow("black")
    setBorderLine("")
  }

  return (
    <Card
      sx={{ maxWidth: 345, color: shadow, border: borderLine }}
     
      onMouseOver={() => changeOver()}
      onMouseOut={() => changeOut()}
    >
      <div  onClick={() => !modify ? navigate("/trip/" + id): null}>
      <CardMedia
        component="img"
        height="140"
        image={!background ? require("../../assets/image.jpeg") : background }
        alt="dune"
      />
      {!modify ?
      <CardContent>   
        <Typography sx={{ color: shadow }} gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ color: shadow }}  variant="body2" color="text.secondary">
          {description}
        </Typography>  
      </CardContent>
      : 
      <CardContent>
      <TextField
        id="standard-basic"
        label="title"
        variant="standard"
        value={newName}
        onChange={handleTripNameChange}
      />

      <TextField
        id="standard-basic"
        label="Description"
        variant="standard"
        value={newDescription}
        onChange={handleDescriptionChange}
      />

      <TextField
        id="standard-basic"
        label="url de l'image de fond"
        variant="standard"
        value={newBackground}
        onChange={handleBackgroundChange}
      />

      
      <Button onClick={saveTrip}>
        save
      </Button>
    </CardContent>}
    </div>
    {!modify ?<CardActions>
         <Button size="small" onClick={() => setModify(true)}>
          Edit
        </Button>
        <Button onClick={handleDelete}>Delete</Button>
        </CardActions>
        
        : 
        <CardActions>
        <Button onClick={()=> {
          setModify(false);
          setTripName(name);
          setDescription(description);
          }}> Cancel
          </Button>
          </CardActions>
          }

        
      
    </Card>
  );
};

export default CardTrip;
