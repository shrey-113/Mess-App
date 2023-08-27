const { DB } = require("../db/dbConnection");
const secret = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");

const encodeJWT = (userId) => {
  const payload = { userId };
  const options = {
    expiresIn: "7d", // Set expiration time for the token
  };
  return jwt.sign(payload, secret, options);
};

const login = async (email) => {
  try {
    const rollNo = email.split("@")[0];

    const token = await encodeJWT(rollNo);

    return token;
  } catch (error) {
    console.log(error);
  }
};

const signup = async (name, email, photo) => {
  try {
    const rollNo = email.split("@")[0];
    const response = DB.query(
      `Insert into Users values ('${rollNo}', '${name}', '${email}', '${photo}', 'Student')`
    );

    if (!response) {
      return false;
    }

    const token = await encodeJWT(rollNo);

    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login, signup };
