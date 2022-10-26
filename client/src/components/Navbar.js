import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useAppContext } from "../context/appContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navlinks from "./Navlinks";

const Navbar = () => {
  const { logoutUser, user } = useAppContext();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Inventory Management System
          </Typography>
          <div>
            <Navlinks />
          </div>
          <div>
            <IconButton
              size="large"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleClick}
            >
              <AccountCircleIcon />
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                style={{ margin: "0px 0px 0px 5px" }}
              >
                {user.name}
              </Typography>
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <Link
                to={"/profile"}
                style={{ textDecoration: "none", color: "#000" }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
              </Link>
            </Menu>
          </div>
          <Button variant="contained" onClick={logoutUser}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
