import { TextField } from "@mui/material";
import React from "react";
import listAPI from "../../api/listApi";
import { useQuery } from "react-query";


const Journal = ({content,user,title,date,file}) => {
   

   
  return (
   <div style={{
    width:"60vw",
    height:"50vh",
    marginTop: "5px",
    marginLeft: "5px",
    backgroundColor:"#FFFFFF80",
    borderRadius: "0px 30px 30px 30px",

   }} >
        {content}
   </div>
  );
};

export default Journal;
