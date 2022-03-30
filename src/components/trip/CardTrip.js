import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//mui import
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CardTrip = ({ id, name, description }) => {
  const navigate = useNavigate();

  const [shadow, setShadow] = useState("black");
  const [borderLine, setBorderLine] = useState("");


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
      onClick={() => navigate("/trip/" + id)}
      onMouseOver={() => changeOver()}
      onMouseOut={() => changeOut()}
    >
      <CardMedia
        component="img"
        height="140"
        image={require("../../assets/dune.png")}
        alt="dune"
      />
      <CardContent>
        <Typography sx={{ color: shadow }} gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ color: shadow }}  variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate("/trip/" + id)}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardTrip;
