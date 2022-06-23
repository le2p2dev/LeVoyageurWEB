import { TextField } from "@mui/material";
import React from "react";
import listAPI from "../../api/listApi";
import { useQuery } from "react-query";


const Journal = ({content,user,title,date,file}) => {
   

   
  return (<>
   <div style={{
    boxShadow:"3px 3px 3px 3px #00000030",
    width:"75vw",
    minHeight:"20vh",
    marginLeft: "3vw",
    marginTop:"1vh",
    padding:"10px",
    backgroundColor:"#FFFFFF80",
    borderRadius: "0px 30px 30px 30px",

   }} >
    <span style={{fontSize:20}}>{title}</span>
    <p>{content}</p>
    
   </div>
 </>
  );
};

export default Journal;
