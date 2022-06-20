import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid,Paper,Avatar,TextField,Button,Typography,Link } from "@mui/material";

import { AccountCircle } from "@mui/icons-material";

import FlagFR from "../assets/fr.png"
import FlagEN from "../assets/en.png"

import listAPI from "../api/listApi.js";

const Signin = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };

  const btnstyle = { margin: "8px 0" };

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [lang, setLang] = useState(1);

  const handleClick = () => {
    listAPI
      .Login(username, password)
      .then((data) => {
        if (data.token) {
          window.localStorage.setItem("isLogged", "true");
          window.localStorage.setItem("token", data.token);
          navigate("/home");
        }
        if (data.error) {
          setError(true);
          console.log("data error", data.status);
        }
      })
      .catch((error) => setError(true));
  };

  return (
    <Paper elevation={5} style={paperStyle} sx={{ minWidth: "20%" }}>
      <Grid align="center">
        <Avatar>
          {" "}
          <AccountCircle />{" "}
        </Avatar>
        <h2>{lang === 1 ? "Sign in" : "Connexion"}</h2>
      </Grid>
      <TextField
        label={lang === 1 ? "Username" : "Nom d'utilisateur"}
        placeholder={lang === 1 ? "enter username" : "Nom d'utilisateur"}

        fullWidth
        required
        error={error ? true : false}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        label={lang === 1 ? "Password" : "Mot de passe"}
        placeholder={lang === 1 ? "enter password" : "entrez votre mot de passe"}
        type="password"
        helperText={error ? "incorrect password" : ""}
        error={error ? true : false}
        fullWidth
        required
      />
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={btnstyle}
        fullWidth
        onClick={handleClick}
      >
        {lang === 1 ? "Sign In" : "Connexion"}
      </Button>

      <Typography>
        {lang === 1 ? "Don't have an account yet ? " : "Vous n'avez pas encore de compte ? "}
        <Link onClick={() => navigate("/account/create")}>{lang === 1 ? "Sign Up" : "Créer un compte"}</Link>
      </Typography>

      <Button
        style={{marginTop:"5%", marginLeft:"75%"}}
        onClick={() => lang === 1 ? setLang(2) : setLang(1)}
      >
        {lang === 1 ? <img src={FlagFR}/> : <img src={FlagEN}/>}
        
      </Button>
    </Paper>
  );
};

export default Signin;
