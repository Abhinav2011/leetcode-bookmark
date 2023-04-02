import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { logout } from "../../firebase";
import Search from "../search/Search";
import Sort from "../sortData/Sort";
import { Container } from "react-bootstrap";

const Header = ({
  userProfilePhoto,
  bookmarks,
  handleSearchInput,
  handleSort,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Leetcode Bookmark
          </Typography>
          <Button color="inherit" onClick={logout}>
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
            class="w-8 h-8 rounded-full"
            src={userProfilePhoto}
            alt="user photo"
          />
        </Toolbar>
      </AppBar>
      <Search bookmarks={bookmarks} handleSearchInput={handleSearchInput}/>
      <Sort
        handleSort={handleSort}
      />
    </Box>
  );
};

export default Header;
