import React from "react";
import listAPI from "../../api/listApi";
import { useQuery } from "react-query";
import MessageCard from "./MessageCard"
import { People } from "@mui/icons-material";

const Journal = ({idTrip}) => {
    const {isLoading, data: messages} = useQuery(idTrip+"journal",() => listAPI.getJournalEntries(idTrip))

    const style = {
        width: "95vw",
        height: "90vh",
        overflow: 'auto',
        background: "linear-gradient(to right top, #1976d2, #0096dc, #00adbe, #00bd89, #81c654)"
    }

    if(isLoading){
        return "loading.."
    }
  return (
   <div style={style}>
    <p style={{fontSize:30, color:"white", textShadow: "2px 2px 2px black", marginLeft:"1vw"}}>Journal</p>
    {
        messages.map( (message) => {
            return ( <>
            <div style={{display: "flex", flexDirection: "row", overflow: 'hidden', marginLeft:"1vw"}}>
                <div style={{display: "flex", flexDirection:"column"}}>
                    {message.User.avatar ? <img alt="user avatar" style={{border:"2px solid white",boxShadow:"2px 2px 2px black", borderRadius:"50%", marginTop:"1vh"}} height={"60px"} width={"60px"} src={message.User.avatar} /> : <People style={{fontSize:"60", color:"white",boxShadow:"2px 2px 2px black", border: "2px solid white", borderRadius:"50%", marginTop:"1vh"}}/>}
                    <span style={{color:"white", textShadow: "2px 2px 2px black"}}>{message.User.username}</span>
                    <span style={{color:"white", textShadow: "2px 2px 2px black"}}>{message.creationDate}</span>
                </div>
            <MessageCard content={message.content} user={message.User.username} title={message.title} date={message.creationDate} file={message.File}/>
            </div></>)
        })
    }
    
   </div>
  );
};

export default Journal;
