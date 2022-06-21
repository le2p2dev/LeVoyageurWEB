import { IconButton, TextField } from "@mui/material";
import React from "react";
import listAPI from "../../api/listApi";
import { useQuery } from "react-query";
import MessageCard from "./MessageCard"
import { People } from "@mui/icons-material";



const Journal = ({idTrip}) => {
    const {isLoading, data: messages} = useQuery(idTrip+"journal",() => listAPI.getJournalEntries(idTrip))

    const style = {
        width: "100vw",
        height: "90vh",
        zIndex :5 ,
        overflow: 'auto',
        background: "rgb(32,29,103)",
        background: "linear-gradient(90deg, rgba(32,29,103,1) 0%, rgba(24,24,176,1) 48%, rgba(24,118,209,1) 84%)"
    }

    if(isLoading){
        return "loading.."
    }
  return (
   <div style={style}>
    {
        messages.map( (message) => {
            return ( <div style={{display: "flex", flexDirection: "row"}}>
                <IconButton>{message.User.avatar  ? <img style={{border: "2px solid white", borderRadius:"50%"}} height={"50vh"} width={"50vh"} src={message.User.avatar} /> : <People />}</IconButton>
            <MessageCard content={message.content} user={message.user} title={message.title} date={message.creationDate} file={message.File}/>
            </div>)
        })
    }
    
   </div>
  );
};

export default Journal;
