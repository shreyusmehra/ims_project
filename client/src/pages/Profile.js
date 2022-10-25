import { useAppContext } from "../context/appContext";
import { useState } from "react";
import AlertComponent from "../components/Alert";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";

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
  return (
    <div
      style={{
        margin: "80px 0px 0px 0px ",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        width: "30%",
      }}
    >
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1 }}
        style={{ textAlign: "center" }}
      >
        Profile
      </Typography>
      {showAlert && <AlertComponent />}
      <TextField
        value={name}
        placeholder="Name"
        variant="outlined"
        onChange={(e) => setName(e.target.value)}
        style={{ margin: "20px 0px 10px 0px" }}
      />
      <TextField
        value={email}
        placeholder="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "10px 0px 10px 0px" }}
      />
      <Button
        variant="outlined"
        disabled={isLoading}
        onClick={handleSubmit}
        style={{ margin: "20px 0px 0px 0px" }}
      >
        {isLoading ? "Please wait ..." : "Save Changes"}
      </Button>
    </div>
  );
};
export default Profile;
