const Inventory = require("../models/Inventory");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors/index");
const checkPermissions = require("../utils/checkPermissions");
const mongoose = require("mongoose");
const moment = require("moment");

const createInventory = async (req, res) => {
  const { productName, description } = req.body;
  if (!productName || !description) {
    throw new BadRequestError("Please provide all values");
  }
  req.body.createdBy = req.user.userId;
  const product = await Inventory.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllInventory = async (req, res) => {
  const { status, category, sort, search } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };

  if (status && status !== "all") {
    queryObject.status = status;
  }
  if (category && category !== "all") {
    queryObject.category = category;
  }
  if (search) {
    queryObject.productName = { $regex: search, $options: "i" };
  }

  let result = Inventory.find(queryObject);

  // sort conditions
  if (sort === "latest") {
    result = result.sort("-createdAt");
  }
  if (sort === "oldest") {
    result = result.sort("createdAt");
  }
  if (sort === "a-z") {
    result = result.sort("productName");
  }
  if (sort === "z-a") {
    result = result.sort("-productName");
  }

  // setup pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const inventory = await result;
  const totalInventory = await Inventory.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalInventory / limit);

  res.status(StatusCodes.OK).json({ inventory, totalInventory, numOfPages });
};

const updateInventory = async (req, res) => {
  const { id: inventoryId } = req.params;
  const { description, productName } = req.body;

  if (!description || !productName) {
    throw new BadRequestError("Please provide all values");
  }
  const product = await Inventory.findOne({ _id: inventoryId });

  if (!product) {
    throw new NotFoundError(`No product with id:${inventoryId}`);
  }

  // check permissions
  checkPermissions(req.user, product.createdBy);

  const updatedProduct = await Inventory.findOneAndUpdate(
    { _id: inventoryId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedProduct });
};

const deleteInventory = async (req, res) => {
  const { id: inventoryId } = req.params;

  const product = await Inventory.findOne({ _id: inventoryId });

  if (!product) {
    throw new NotFoundError(`No product with id:${inventoryId}`);
  }

  // check permissions
  checkPermissions(req.user, product.createdBy);
  await product.remove();

  res.status(StatusCodes.OK).json({ msg: "Success! Product removed" });
};

const showStats = async (req, res) => {
  let stats = await Inventory.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    available: stats.available || 0,
    unavailable: stats.unavailable || 0,
  };

  let monthlyProducts = await Inventory.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);
  monthlyProducts = monthlyProducts
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format("MMM Y");
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyProducts });
};

module.exports = {
  createInventory,
  getAllInventory,
  updateInventory,
  deleteInventory,
  showStats,
};
