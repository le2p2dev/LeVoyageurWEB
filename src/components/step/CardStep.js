import React, {useState } from "react";


import PoiList from "../POI/PoiList";
import {Switch, TextField} from "@mui/material";

const CardStep = ({id,title,description,idStep}) => {




    return <div key={id} style={{border: "2px solid red"}} >
        <TextField  id="standard-basic"  InputProps={{ disableUnderline: true }} variant="standard" value={title}/>
        <br />
        <TextField id="standard-basic" variant="standard"   InputProps={{ disableUnderline: true }} placeholder={"description"} value={description}/>



        <PoiList idStep={idStep} />

    </div>
}

export default CardStep