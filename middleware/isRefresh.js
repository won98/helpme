const jwt = require("jsonwebtoken");
const createToken = require("../utils/jwt");
const db = require("../database/db");

// const createToken = (payload) => {
//   console.log("createToken");
//   const token = jwt.sign({ username: payload.toString() }, secretKey, {
//     algorithm: "sha256",
//     expiresIn: "30m",
//   });
//   return token;
// };

module.exports = async (req, res, next) => {
  try {
    const refreshtoken = req.get("r_x_auth");

    if (!refreshtoken) {
      return false;
    }

    const decodedToken = jwt.verify(refreshtoken, R_ACCESS_KEY);
    const data = [decodedToken.username];

    const sql = "select * from member where user_id = ?";

    const conn = await db.getConnection();
    const [rows] = await conn.query(sql, data);
    if (rows) {
      const newtoken = createToken(rows[0].username);
      res.send(newtoken);
    } else {
      return false;
    }
  } catch (err) {
    next(err);
  }
};
