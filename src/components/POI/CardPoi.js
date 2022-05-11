import {useQuery} from "react-query";
import {Button, Grid, Switch, TextField} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import EditIcon from '@mui/icons-material/Edit';
import React from "react";




const CardPoi = ({id,title,description}) => {


    return <Grid item xs={4} >
      id : {id}
    </Grid>
}

export default CardPoi
