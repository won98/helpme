const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = "" + process.env.ACCESS_KEY;
const db = require("../database/db");

module.exports = async (req, res, next) => {
  try {
    const token = req.get("x_auth");
    const decodedToken = jwt.verify(token, secretKey);
    const { username } = decodedToken;
    const data = [username];
    const sql = "select * from member where username = ?";
    const conn = await db.getConnection();
    const [rows] = await conn.query(sql, data);
    if (!rows) {
      return false;
    }
    next();
  } catch (err) {
    next(err);
  }
};
