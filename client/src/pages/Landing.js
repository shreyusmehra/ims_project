import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div>
      <h1>This is the landing page</h1>
      <h2>Inventory Management System</h2>
      <Button variant="outlined">
        <Link to={"/register"} style={{ textDecoration: "none" }}>
          Login/Register
        </Link>
      </Button>
    </div>
  );
};

export default Landing;
