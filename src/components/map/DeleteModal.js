import React, {useState } from "react";
import Button from '@mui/material/Button';


const DeleteModal = (props) => {

    return(

        <div>
            <p> Are you sure you want to delete this {props.type} </p>
            <div className = "BtnBox">
                <Button onClick = {props.yesBtnFunction} variant="contained"> Yes </Button>
                <Button onClick = {props.noBtnFunction} variant="contained"> No </Button>
            </div>
        </div>

    );

}

export default DeleteModal;