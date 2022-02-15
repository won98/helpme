const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const compression = require("compression");
const user = require("./routes/use.routes");

app.use(express.json());
app.use(compression());
app.use(express.urlencoded({ extended: false }));

app.use("/user", user);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
