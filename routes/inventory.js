const express = require("express");
const router = express.Router();

const {
  createInventory,
  getAllInventory,
  updateInventory,
  deleteInventory,
  showStats,
} = require("../controllers/inventory");

router.route("/").post(createInventory).get(getAllInventory);
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteInventory).patch(updateInventory);

module.exports = router;
