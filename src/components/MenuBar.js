import React, { useState } from "react";

//mui import
import {
  AppBar,
  Box,
  Toolbar,
  MenuItem,
  IconButton,
  Menu,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

//router import
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
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <MenuItem onClick={() => navigate("/home")}>LeVoyageur</MenuItem>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={handleMenu}
              aria-controls="menu-appbar"
              aria-haspopup="true"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              open={Boolean(anchor)}
              keepMounted
              onClose={handleClose}
              anchorEl={anchor}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={() => navigate("/account")}>
                Mon compte
              </MenuItem>
              <MenuItem onClick={Disconnect}>Déconnexion</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  ) : (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar variant="dense">
            <MenuItem onClick={() => navigate("/home")}>LeVoyageur</MenuItem>
            <MenuItem onClick={() => navigate("/signin")}>Connexion</MenuItem>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default MenuBar;
