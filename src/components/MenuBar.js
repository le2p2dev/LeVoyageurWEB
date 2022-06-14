import React, { useState } from "react";
import { AppBar, Box, Toolbar, MenuItem, IconButton, Menu, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";

const MenuBar = () => {
  const [anchor, setAnchor] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchor(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchor(null);
  };

  const Disconnect = () => {
    window.localStorage.removeItem("isLogged");
    window.localStorage.removeItem("username");
    navigate("/signin");
  };


  return window.localStorage.getItem("isLogged") ? (

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white", height: '10vh'}}>
          <Toolbar sx={{justifyContent: "space-between", marginLeft: "40px", marginRight: "40px"}}>
            <MenuItem onClick={() => navigate("/home")}> <img style={{width:"22vh",height:"9vh" }} src={require("../assets/full.png")} alt={"logo"}/> </MenuItem>
            <IconButton
              size="large"
              edge="start"
              onClick={handleMenu}
              aria-controls="menu-appbar"
              aria-haspopup="true"
              sx={{mr:2}}
            >
              <AccountCircle />
            </IconButton>

            <Menu
              open={Boolean(anchor)}
              keepMounted
              onClose={handleClose}

              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => navigate("/account")}>
                My account
              </MenuItem>
              <MenuItem onClick={Disconnect}>Disconnect</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>

  ) : (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "white", height: '10vh'}}>
          <Toolbar sx={{justifyContent: "space-between", marginLeft: "40px", marginRight: "40px"}}>
            <MenuItem onClick={() => navigate("/home")}> <img style={{width:"22vh",height:"9vh" }} src={require("../assets/full.png")} alt={"logo"}/> </MenuItem>
              <MenuItem style={{color: "black"}} onClick={() => navigate("/signin")}>Sign In</MenuItem>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default MenuBar;
