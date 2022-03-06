import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//mui import
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

//component
import JsonData from "../api/dataJSON/JsonData.js";

const Signin = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    let value = JsonData.login(username, password);
    if (value) {
      window.localStorage.setItem("isLogged", "true");
      window.localStorage.setItem("username", username);
      navigate("/home");
    }
  };

  return (
    <>
      <h1>Connectez vous</h1>
      <TextField
        id="standard-basic"
        label="username"
        variant="standard"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        id="standard-basic"
        label="password"
        variant="standard"
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button onClick={handleClick} variant="contained">
        connexion
      </Button>
      <Button onClick={() => navigate("/account/create")} variant="contained">
        créer un compte
      </Button>
    </>
  );
};

export default Signin;
