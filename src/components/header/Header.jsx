import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "../../../utils/firebase";
import Search from "../search/Search";
import Sort from "../sortData/Sort";
import loading from "../../assets/loading.png";
import { useNavigate } from "react-router-dom";

const Header = ({ userProfilePhoto }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  }
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static" className="header">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }} className="header-text">
            Leetcode Bookmark
          </Typography>
          <Button color="inherit" onClick={handleLogout} className="logout-button">
            Logout
          </Button>
          <button
            type="button"
            class="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          ></button>
          <img
            className="w-8 h-8 rounded-full profile-pic"
            src={!userProfilePhoto ? loading : userProfilePhoto}
            alt="user photo"
          />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
