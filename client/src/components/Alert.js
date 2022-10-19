import { useAppContext } from "../context/appContext";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const AlertComponent = () => {
  const { alertType, alertText } = useAppContext();
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity={alertType}>
        <AlertTitle style={{ textTransform: "capitalize" }}>
          {alertType}
        </AlertTitle>
        {alertText}
      </Alert>
    </Stack>
  );
};

export default AlertComponent;
