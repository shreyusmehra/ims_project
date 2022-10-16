require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

// db
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/auth");
const inventoryRouter = require("./routes/inventory");

// middleware
const authenticateUser = require("./middleware/authentication");
const errorHandlerMiddleware = require("./middleware/error_handler");
const notFoundMiddleware = require("./middleware/not_found");

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.json());
// app.set("trust proxy", 1); uncomment when using for production
app.use(cors());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/inventory", authenticateUser, inventoryRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
