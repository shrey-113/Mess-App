const express = require("express");
const { DB } = require("./db/dbConnection");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const { authController } = require("./controllers/auth");
const {
  order,
  getPreviousOrders,
  getOrderTotalsByDateRange,
  getDailyMonthlyTotalQuantity,
} = require("./controllers/order");
const { verifyAccessToken } = require("./middlewares/authorization");

app.get("/test", async (req, res) => {
  console.log(req.body);
  console.log("Test route hit");
  res.status(200).json({ message: "Message received" });
});

app.post("/auth/google/exchange", authController);

app.post("/order", verifyAccessToken, order);

app.get("/user/getorders", verifyAccessToken, getPreviousOrders);

app.post("/admin/generate", verifyAccessToken, getOrderTotalsByDateRange);

app.get("/getdailyorders", getDailyMonthlyTotalQuantity);

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await DB.connect();
  console.log("Database Connected!");
});
