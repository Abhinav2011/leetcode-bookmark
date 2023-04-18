import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { logout } from "../../../utils/firebase";
import loading from "../../assets/loading.png";
import { useNavigate} from "react-router-dom";

const Header = ({ userProfilePhoto }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="header">
        <Toolbar>
          {/* <Link to="/homepage"> */}
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
              className="header-text"
            >
              Leetcode Bookmark
            </Typography>
          {/* </Link> */}
          
          <Button
            color="inherit"
            onClick={handleLogout}
            className="logout-button"
          >
            Logout
          </Button>
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
