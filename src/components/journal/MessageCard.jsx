import { TextField } from "@mui/material";
import React from "react";
import listAPI from "../../api/listApi";
import { useQuery } from "react-query";


const Journal = ({content,user,title,date,file}) => {
   

   
  return (
   <div style={{
    width:"100vh",
    height:"50vh",
    marginBottom: "5px",
    marginLeft: "5px",
    backgroundColor:"white",
    border:"2px black solid",
    borderRadius: "10px 10px 10px 0px"
   }} >
        {content}    
   </div>
  );
};

export default Journal;
