const db = require("../database/db");
const argon2 = require("argon2");
const { createToken, creatRefreshToken } = require("../utils/jwt");

module.exports = {
  Join: async (req, res) => {
    try {
      const password = await argon2.hash(req.body.password);
      //const password2 = await argon2.hash(req.body.password2);
      const data = [req.body.username, password];
      console.log(data);
      const sql = "insert into member(`username`, `password`) values(?,?)";
      const conn = await db.getConnection();
      await conn.query(sql, data);
      conn.release();
      return res.status(200).send("success");
    } catch (error) {
      return res.send("ERROR");
    }
  },
  // Login: async (req, res) => {
  //   //const data = [req.body.username];
  //   console.log(req.body);
  //   //const data = [req.body.username];

  //   try {
  //     const data = [req.body.username];
  //     const sql = "SELECT * from member where username = ?";
  //     const conn = await db.getConnection();
  //     //db.findOne[req.body.username];
  //     const [rows] = await conn.query(sql, data);
  //     conn.release();
  //     console.log(rows[0].password);
  //     const compare = await argon2.verify(rows[0].password, req.body.password);
  //     if (compare == true) {
  //       const token = createToken(rows[0].username);
  //       const rtoken = creatRefreshToken(rows[0].username);
  //       res.send([token, rtoken]);
  //       console.log(result.rows[0].password);
  //     } else {
  //       res.json("Password incorrect");
  //     }
  //   } catch (err) {
  //     console.log("ERROR " + err);
  //   }
  // },
  Login: (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
      return res
        .status(500)
        .json({ result: "아이디나 비밀번호를 입력해주세요." });
    db.getConnection((err, conn) => {
      if (!err) {
        conn.query(
          "SELECT * FROM member WHERE username = ?",
          [username],
          (err, rows) => {
            if (err) return res.status(500).json({ result: err });
            if (rows.length === 0)
              return res.status(500).json({ result: "아이디가 없습니다." });
            if (rows[0].password === password) {
              const token = jwt.sign(
                {
                  username: req.body.username,
                  info: "username",
                },
                privateKey,
                { expiresIn: "60s" }
              );
              const refreshToken = jwt.sign(
                {
                  username: req.body.username,
                  info: "username",
                },
                refreshKey,
                { expiresIn: "3d" }
              );

              conn.query(
                "UPDATE user SET access_token = ?, refresh_token = ? WHERE email = ?",
                [token, refreshToken, email],
                (err, rows) => {
                  if (err) return res.status(500).json({ result: err });
                }
              );

              return res.json({
                msg: "로그인 성공",
                result: { access_token: token, refresh_token: refreshToken },
              });
            } else {
              return res.status(500).json({ result: "비밀번호가 틀렸습니다." });
            }
          }
        );
      }
      conn.release();
    });
  },
};
