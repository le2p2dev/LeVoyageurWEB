import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import listAPI from "../api/listApi";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { TextField, IconButton } from "@mui/material";
import { People } from "@mui/icons-material";

const Members = ({ idTrip }) => {
    const [member, setMember] = useState("");
    const [error, setError] = useState("");

    const updateTrip = useMutation(listAPI.UpdateTrip, {
        onSuccess: (data) => {
            if (data == "404") {
                setError("User not found");
            } else {
                setError("");
                refetch();
            }
        },
    });

    const addMember = (userName) => {
        setMember("");
        updateTrip.mutate({
            newuser: userName,
            id: idTrip,
        });
    };

    const handleMemberChange = (event) => {
        setMember(event.target.value);
    };

    //usequery get members from db

    const {
        isLoading: isLoadingMembers,
        data: membersFromTrip,
        refetch,
    } = useQuery(["getMembers", [idTrip]], listAPI.GetMembersFromTrip, {
        onSuccess: (data) => {},
    });

    return (
        <div style={{ marginLeft: "10%", width: "100%" }}>
            <h2>Members</h2>
            <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                onChange={handleMemberChange}
                value={member}
            />
            <IconButton onClick={() => addMember(member)}>
                <PersonAddAltIcon sx={{fontSize:36}} />
            </IconButton>
            {error == "" ? null : <p style={{color:"red"}}> {error} </p>}
            <div>
                {isLoadingMembers
                    ? null
                    : membersFromTrip?.map((e, i) => {
                          return (<div style={{display: "flex",flexDirection:"row"}}>
                            {e.avatar ? <img alt="user Avatar" style={{border:"2px solid white",boxShadow:"2px 2px 2px black", borderRadius:"50%", marginTop:"1vh"}} height={"60px"} width={"60px"} src={e.avatar} /> : <People style={{fontSize:"60",boxShadow:"2px 2px 2px black", color:"black", border: "2px solid white", borderRadius:"50%", marginTop:"1vh"}}/>}
                            <p style={{marginLeft:"2vw", paddingTop:"7px"}}>{e.username} </p>
                          </div>);
                      })}
            </div>
        </div>
    );
};

export default Members;
