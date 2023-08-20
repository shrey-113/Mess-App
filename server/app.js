const express = require("express");
const { DB } = require("./db/dbConnection");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/test", async (req, res) => {
  console.log(req.body);
  console.log("Test route hit");
  res.status(200).json({ message: "Message recieved" });
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT}`);
  await DB.connect();
  console.log("Database Connected!");
});
