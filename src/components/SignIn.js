import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

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

	const handleClick = () => {

		listAPI.Login(username, password)
			.then((data) => {
				if (data.token) {
					window.localStorage.setItem("isLogged", "true");
					window.localStorage.setItem("token", data.token);
					navigate("/home");
				} 
				if(data.error) {
					setError(true);
					console.log("data error",data.status);
				}
			}
		).catch((error)=>setError(true));
	};

	return (
		<Paper elevation={5} style={paperStyle} sx={{minWidth:"20%"}}>
			<Grid align="center">
				<Avatar> <AccountCircle /> </Avatar>
				<h2>Sign In</h2>
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
				onChange={(e) => {setPassword(e.target.value);}}
				label="Password"
				placeholder="Enter password"
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
				Sign in
			</Button>

			<Typography>
				Don't have an account ? 
				<Link onClick={() => navigate("/account/create")}>Sign Up</Link>
			</Typography>
		</Paper>
	);
};

export default Signin;
