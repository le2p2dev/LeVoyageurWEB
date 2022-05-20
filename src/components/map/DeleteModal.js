import React, {useState } from "react";
import { InputAdornment, FormControl, InputLabel, Input, Button, MenuItem, TextField, IconButton, Modal } from "@mui/material";


const DeleteModal = (props) => {

    return(

        <div style={{justifyContent: "center"}}>
            <p> Are you sure you want to delete this {props.type} ?</p>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                <Button onClick = {props.yesBtnFunction} style={{backgroundColor: "red"}} variant="contained"> Yes </Button>
                <Button onClick = {props.noBtnFunction} variant="contained"> Cancel </Button>
            </div>
        </div>

    );

}

export default DeleteModal;