const express = require("express");
const { sequelize } = require("./models");
const cors = require("cors");
require("dotenv").config({ path: ".env" });

const app = express();
app.use(express.json());
app.use(cors());

app.use("/", require("./routers/routers"));
app.use(require("./controllers/errorController"));

app.listen(4010, async () => {
  await sequelize.authenticate();
  console.log(`Connected and Listening on port 4010...`);
});
