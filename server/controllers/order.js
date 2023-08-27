const { DB } = require("../db/dbConnection");

const order = (req, res, next) => {
  return res.status(200).json({ message: "Verfied" });
};

module.exports = { order };
