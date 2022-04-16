import React, { useState } from "react";
import TripList from "./trip/TripList";
import { useNavigate } from "react-router-dom";

import  imageBG from '../assets/voyage.jpeg'

//mui imports
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {CssBaseline, Grid, Paper} from "@mui/material";
import {Box} from "@mui/system";

const DiscoverVoyageur = () => {
  const navigate = useNavigate();

  const [number, setNumber] = useState(0);
  const name = ["Bonjour", "Hola", "Guten tag", "Wilkommen", "Nǐn hǎo"];

  const isLogged = window.localStorage.getItem('isLogged')

  var interval = setTimeout(() => {
    let nameChoosen = name[number];
   // document.getElementById("title").innerHTML = "";
    //document.getElementById("title").innerHTML = `<h1> ${nameChoosen}   </h1>`;
    if (number + 1 < name.length) {
      setNumber(number + 1);
    } else {
      setNumber(0);
    }
  }, 2000);

  return (
      <>
        <div  style={{
            display: 'flex',
            flexDirection: 'row',
            backgroundImage: `url(https://c.tenor.com/bOJzGR2YhHQAAAAC/dedsec-logo.gif)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            height: '90vh'

        }}>
                <div style={{
                    height: '90vh',
                    width: "40vw",
                    backgroundColor: "white",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    paddingLeft: '10px'
                }} >
                    <h1>Le Voyageur</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aspernatur dignissimos est eveniet, expedita fugiat ipsum neque nisi optio pariatur quas quibusdam quis quisquam tempore unde. Accusantium alias at corporis deserunt eaque facere, fugit illum ipsum magni maxime, nemo nihil nostrum officia perferendis provident repellendus sapiente sequi sint, temporibus veritatis.</p>


                    { isLogged  ? <Button onClick={() => navigate("/trip/list")}> access trip</Button> : <Button  onClick={() => {
                        navigate("/signin")
                    }}>Connexion</Button>}
                </div>
        </div>

      </>
  );
};

export default DiscoverVoyageur;
