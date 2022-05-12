import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//mui import
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { AccountCircle } from "@mui/icons-material";

//component
import JsonData from "../api/dataJSON/JsonData.js";
import { useQueries } from "react-query";
import listAPI from "../api/listApi.js";

const Signin = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(false);

  const handleClick = () => {
    if (password !== confirmPassword) {
      setError(true);
    } else {
      listAPI.Register(username, password).then((data) => {
        if (data.id) {
          navigate("/home");
        } else {
          setError(true);
        }
      });
    }
  };

  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar>
              <AccountCircle />
            </Avatar>
            <h2>Créer un compte</h2>
          </Grid>
          <TextField
            label="Username"
            placeholder="Enter username"
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
            label="Password"
            placeholder="Enter password"
            type="password"
            helperText={error ? "incorrect password" : ""}
            error={error ? true : false}
            fullWidth
            required
          />
          <TextField
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            label="Confirm Password"
            placeholder="Confirm password"
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
            Créer
          </Button>
        </Paper>
      </Grid>
    </>
  );
};

export default Signin;
