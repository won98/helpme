const jwt = require("jsonwebtoken");

const { ACCESS_KEY, REFRESH_KEY } = process.env;

const createToken = (payload) => {
  const token = jwt.sign({ username: payload.toString() }, ACCESS_KEY, {
    algorithm: "sha256",
    expiresIn: "30m",
  });
  return token;
};

const creatRefreshToken = (payload) => {
  const retoken = jwt.sign({ username: payload.toString() }, REFRESH_KEY, {
    algorithm: "sha256",
    expiresIn: "1d",
  });
  return retoken;
};

module.exports = { createToken, creatRefreshToken };
// 암호를 못품
