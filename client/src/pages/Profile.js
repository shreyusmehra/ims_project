import { useAppContext } from "../context/appContext";
import { useState } from "react";
import AlertComponent from "../components/Alert";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { motion } from "framer-motion";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) {
      displayAlert();
      return;
    }
    updateUser({ name, email });
  };

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  return (
    <div
      style={{
        margin: "80px 0px 0px 0px ",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      {showAlert && <AlertComponent />}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ ease: "easeIn", duration: 1, delay: 1 }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ flexGrow: 1 }}
          style={{ margin: "0px 0px 10px 0px " }}
        >
          Profile
        </Typography>
        <AccountCircleIcon
          fontSize={"large"}
          style={{ margin: "0px 0px 0px 15px" }}
        />
      </motion.div>
      <motion.div
        animate={{ x: [-1000, 0], opacity: 1 }}
        transition={{
          delay: 2,
          x: { type: "spring", stiffness: 100 },
          default: { duration: 2 },
        }}
      >
        <TextField
          value={name}
          label="Name"
          variant="outlined"
          onChange={(e) => setName(e.target.value)}
          style={{ margin: "20px 0px 10px 0px" }}
        />
      </motion.div>
      <motion.div
        animate={{ x: [1000, 0], opacity: 1 }}
        transition={{
          delay: 2,
          x: { type: "spring", stiffness: 100 },
          default: { duration: 2 },
        }}
      >
        <TextField
          value={email}
          label="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: "10px 0px 10px 0px" }}
        />
      </motion.div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ ease: "easeIn", duration: 1, delay: 2 }}
      >
        <Button
          variant="outlined"
          disabled={isLoading}
          onClick={handleSubmit}
          style={{ margin: "20px 0px 0px 0px" }}
        >
          {isLoading ? "Please wait ..." : "Save Changes"}
        </Button>
      </motion.div>
    </div>
  );
};
export default Profile;
