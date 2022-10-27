import { useAppContext } from "../context/appContext";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Inventory = ({ _id, productName, description, status, category }) => {
  const { setEditInventory, deleteInventory } = useAppContext();

  return (
    <div>
      <Card
        sx={{ minWidth: 275 }}
        style={{
          margin: "20px 10px 20px 10px",
          border: "1px solid #000",
          borderRadius: "5px",
          cursor: "pointer",
          width: "30%",
        }}
        elevation={3}
      >
        <CardContent style={{ textTransform: "capitalize" }}>
          <Typography variant="h5" component="div">
            {productName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {category}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {status}
          </Typography>
          <Typography variant="body2">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">
            <Link
              to={"/addinventory"}
              style={{ textDecoration: "none", color: "#1976d2" }}
              onClick={() => setEditInventory(_id)}
            >
              Edit
            </Link>
          </Button>
          <Button
            size="small"
            onClick={() => deleteInventory(_id)}
            color="error"
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default Inventory;
