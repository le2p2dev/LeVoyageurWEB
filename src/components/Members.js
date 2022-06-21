import React, { useState } from "react";
import { useMutation, queryClient, useQuery } from "react-query";
import listAPI from "../api/listApi";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { TextField } from "@mui/material";

const Members = ({ idTrip }) => {
    const [member, setMember] = useState("");
    const [memberList, setMemberList] = useState([]);
    const [error, setError] = useState("");

    const updateTrip = useMutation(listAPI.UpdateTrip, {
        onSuccess: (data) => {
            if (data == "404") {
                setError("user not found");
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
            <button onClick={() => addMember(member)}>
                {" "}
                <PersonAddAltIcon />{" "}
            </button>
            {error == "" ? null : <p> {error} </p>}
            <div>
                {isLoadingMembers
                    ? null
                    : membersFromTrip?.map((e, i) => {
                          return <li key={i}> {e.username} </li>;
                      })}
            </div>
        </div>
    );
};

export default Members;
