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
        overflow: 'auto',
        background: "linear-gradient(to right top, #1976d2, #0096dc, #00adbe, #00bd89, #81c654)"
    }

    if(isLoading){
        return "loading.."
    }
  return (
   <div style={style}>
    {
        messages.map( (message) => {
            return ( <div style={{display: "flex", flexDirection: "row", overflow: 'hidden'}}>
                {message.User.avatar  ? <img style={{border: "2px solid white", borderRadius:"50%"}} height={"60px"} width={"60px"} src={message.User.avatar} /> : <People />}
            <MessageCard content={message.content} user={message.user} title={message.title} date={message.creationDate} file={message.File}/>
            </div>)
        })
    }
    
   </div>
  );
};

export default Journal;
