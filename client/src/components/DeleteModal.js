import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useAppContext } from "../context/appContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DeleteModal = ({ open, handleClose, _id, productName }) => {
  const { deleteInventory } = useAppContext();
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Are you sure you want to delete {productName}?
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: "10px 0px 0px 0px",
          }}
        >
          <Button variant="outlined" onClick={() => deleteInventory(_id)}>
            Yes
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            No
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default DeleteModal;
