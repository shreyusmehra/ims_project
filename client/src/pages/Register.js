import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="home-container">
      <motion.div
        animate={{ y: [-100, 0] }}
        transition={{ ease: "easeIn", duration: 1 }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Inventory Management System
              </Typography>
            </Toolbar>
          </AppBar>
        </Box>
      </motion.div>
      <div className="login-form-container">
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
