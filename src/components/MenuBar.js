import React from "react";

//mui import
import { AppBar, Box, Toolbar, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

//router import
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const navigate = useNavigate();

  console.log(window.localStorage);

  const Disconnect = () => {
    window.localStorage.removeItem("isLogged");
    window.localStorage.removeItem("username");
    navigate("/signin");
  };

  return window.localStorage.getItem("isLogged") ? (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <MenuItem onClick={() => navigate("/home")}>LeVoyageur</MenuItem>
            <MenuItem onClick={() => navigate("/account")}>Mon compte</MenuItem>
            <MenuItem onClick={Disconnect}>Déconnexion</MenuItem>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  ) : (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <MenuItem onClick={() => navigate("/home")}>LeVoyageur</MenuItem>

            <MenuItem onClick={() => navigate("/signin")}>Connexion</MenuItem>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default MenuBar;
