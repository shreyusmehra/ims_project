const mongoose = require("mongoose");

const InventorySchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: [true, "Please provide item name"],
      maxlength: 50,
    },
    status: {
      type: String,
      enum: ["available", "unavailable"],
      default: "available",
    },
    category: {
      type: String,
      enum: ["clothing", "electronic", "food", "household", "other"],
      default: "other",
    },
    description: {
      type: String,
      required: [true, "Please provide description of item"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inventory", InventorySchema);
