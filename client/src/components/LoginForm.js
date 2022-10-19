import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appContext";
import AlertComponent from "./Alert";

const initialState = {
  name: "",
  email: "",
  password: "",
  isMember: true,
};

const LoginForm = () => {
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();
  const [values, setValues] = useState(initialState);
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => [
    setValues({ ...values, [e.target.name]: e.target.value }),
  ];

  const handleClick = (e) => {
    e.preventDefault();
    setIsVisible(!isVisible);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "Login Successful! Redirecting...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "User Created! Redirecting...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [user, navigate]);

  const darkTheme = createTheme({ palette: { mode: "light" } });
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="login-form">
        {showAlert && <AlertComponent />}
        <Card
          sx={{ minWidth: 275 }}
          elevation={20}
          style={{ margin: "20px 0px 0px 0px" }}
        >
          <Typography
            variant="h4"
            style={{ textAlign: "center", margin: "20px 0px 0px 0px" }}
          >
            {values.isMember ? "Login" : "Register"}
          </Typography>
          <CardContent>
            {!values.isMember && (
              <Paper
                component="form"
                elevation={0}
                variant="outlined"
                sx={{
                  p: "2px 4px",
                  display: "flex",
                  alignItems: "center",
                  width: 400,
                }}
                className="name-input"
              >
                <TextField
                  variant="standard"
                  label="Full Name"
                  sx={{ ml: 1, flex: 1 }}
                  value={values.name}
                  name="name"
                  onChange={handleChange}
                />
                <IconButton
                  type="submit"
                  sx={{ p: "10px" }}
                  onClick={(e) => e.preventDefault()}
                >
                  <PersonIcon />
                </IconButton>
              </Paper>
            )}
            <Paper
              component="form"
              elevation={0}
              variant="outlined"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
              className="email-input"
            >
              <TextField
                variant="standard"
                label="Email"
                sx={{ ml: 1, flex: 1 }}
                value={values.email}
                name="email"
                onChange={handleChange}
              />
              <IconButton
                type="submit"
                sx={{ p: "10px" }}
                onClick={(e) => e.preventDefault()}
              >
                <EmailIcon />
              </IconButton>
            </Paper>
            <Paper
              component="form"
              elevation={0}
              variant="outlined"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
              }}
              className="password-input"
            >
              <TextField
                variant="standard"
                label="Password"
                sx={{ ml: 1, flex: 1 }}
                type={isVisible ? "text" : "password"}
                value={values.password}
                name="password"
                onChange={handleChange}
              />
              <IconButton
                type="submit"
                sx={{ p: "10px" }}
                onClick={(e) => handleClick(e)}
              >
                {isVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </Paper>
            <Button
              variant="outlined"
              disabled={isLoading}
              onClick={(e) => onSubmit(e)}
            >
              {values.isMember ? "Login" : "Register"}
            </Button>
            <p style={{ margin: "10px 0px 0px 0px" }}>
              {values.isMember ? "Not a Member yet?" : "Already a Member?"}
              <Button onClick={toggleMember}>
                {values.isMember ? "Register" : "Login"}
              </Button>
            </p>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default LoginForm;
