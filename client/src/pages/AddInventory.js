import { useAppContext } from "../context/appContext";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AlertComponent from "../components/Alert";
import { motion } from "framer-motion";

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

  const variants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
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
        margin: "100px 0px 10px 10px",
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
          style={{ textAlign: "center" }}
        >
          {isEditing ? "Edit Inventory" : "Add Inventory"}
        </Typography>
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
          label="Product Name"
          variant="outlined"
          name="productName"
          value={productName}
          onChange={handleInventoryInput}
          style={{
            margin: "10px 0px 10px 0px",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
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
          label="Description of the Product"
          variant="outlined"
          name="description"
          value={description}
          onChange={handleInventoryInput}
          style={{
            margin: "10px 0px 10px 0px",
            backgroundColor: "#fff",
            borderRadius: "5px",
          }}
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
        <FormControl
          sx={{ m: 1, minWidth: 120, backgroundColor: "white" }}
          size="small"
          style={{ margin: "10px 0px 10px 0px", borderRadius: "5px" }}
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
      </motion.div>
      <motion.div
        animate={{ x: [1000, 0], opacity: 1 }}
        transition={{
          delay: 2,
          x: { type: "spring", stiffness: 100 },
          default: { duration: 2 },
        }}
      >
        <FormControl
          sx={{ m: 1, minWidth: 120, backgroundColor: "white" }}
          size="small"
          style={{ margin: "10px 0px 10px 0px", borderRadius: "5px" }}
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
      </motion.div>
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={{ ease: "easeIn", duration: 1, delay: 2 }}
      >
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
      </motion.div>
    </div>
  );
};
export default AddInventory;
