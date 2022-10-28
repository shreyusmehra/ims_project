import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import InventoryIcon from "@mui/icons-material/Inventory";
import { useAppContext } from "../context/appContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import Navlinks from "./Navlinks";
import { motion } from "framer-motion";

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

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <motion.div
      animate={{ y: [-100, 0] }}
      transition={{ ease: "easeIn", duration: 2 }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <InventoryIcon style={{ margin: "0px 5px 0px 0px " }} />
              Inventory Management System
            </Typography>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ ease: "easeIn", duration: 1, delay: 3 }}
            >
              <Navlinks />
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={variants}
              transition={{ ease: "easeIn", duration: 1, delay: 3 }}
            >
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
            </motion.div>
            <motion.div
              animate={{ x: [200, 0], opacity: 1 }}
              transition={{
                delay: 2,
                x: { type: "spring", stiffness: 100 },
                default: { duration: 2 },
              }}
            >
              <Button variant="contained" onClick={logoutUser} color="error">
                Logout
              </Button>
            </motion.div>
          </Toolbar>
        </AppBar>
      </Box>
    </motion.div>
  );
};

export default Navbar;
