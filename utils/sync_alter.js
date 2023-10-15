const { Admin, Comments, Posts, Users, sequelize } = require("../models");

(async () => {
  await Posts.sync({ alter: true });
  console.log("DB Synced");
  process.exit(1);
})();
