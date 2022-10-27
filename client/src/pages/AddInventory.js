import { useAppContext } from "../context/appContext";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AlertComponent from "../components/Alert";

const AddInventory = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    productName,
    description,
    status,
    statusOptions,
    category,
    categoryOptions,
    handleChange,
    clearValues,
    createInventory,
    editInventory,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !description) {
      displayAlert();
      return;
    }
    if (isEditing) {
      editInventory();
      return;
    }
    createInventory();
  };

  const handleInventoryInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  return (
    <div
      className="add-inventory-container"
      style={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        margin: "80px 0px 10px 10px",
      }}
    >
      {showAlert && <AlertComponent />}
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1 }}
        style={{ textAlign: "center" }}
      >
        {isEditing ? "Edit Inventory" : "Add Inventory"}
      </Typography>
      <TextField
        label="Product Name"
        variant="outlined"
        name="productName"
        value={productName}
        onChange={handleInventoryInput}
        style={{ margin: "10px 0px 10px 0px" }}
      />
      <TextField
        label="Description of the Product"
        variant="outlined"
        name="description"
        value={description}
        onChange={handleInventoryInput}
        style={{ margin: "10px 0px 10px 0px" }}
      />
      <FormControl
        sx={{ m: 1, minWidth: 120, backgroundColor: "white" }}
        size="small"
        style={{ margin: "10px 0px 10px 0px" }}
      >
        <InputLabel id="select-status">Status</InputLabel>
        <Select
          value={status}
          label="status"
          name="status"
          onChange={handleInventoryInput}
        >
          {statusOptions.map((item, index) => {
            return (
              <MenuItem
                value={item}
                style={{ textTransform: "capitalize" }}
                key={index}
              >
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl
        sx={{ m: 1, minWidth: 120, backgroundColor: "white" }}
        size="small"
        style={{ margin: "10px 0px 10px 0px" }}
      >
        <InputLabel id="select-category">Category</InputLabel>
        <Select
          value={category}
          label="category"
          name="category"
          onChange={handleInventoryInput}
        >
          {categoryOptions.map((item, index) => {
            return (
              <MenuItem
                value={item}
                style={{ textTransform: "capitalize" }}
                key={index}
              >
                {item}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        onClick={handleSubmit}
        disabled={isLoading}
        style={{ margin: "10px 0px 10px 0px" }}
        color="success"
      >
        {isEditing ? "Save Changes" : "Create"}
      </Button>
      <Button
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          clearValues();
        }}
        color="error"
      >
        Clear
      </Button>
    </div>
  );
};
export default AddInventory;
