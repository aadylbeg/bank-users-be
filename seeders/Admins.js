"use strict";

const bcrypt = require("bcryptjs");
const uuid = require("uuid");

module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          uuid: uuid.v4(),
          username: "admin",
          password: await bcrypt.hash("admin", 12),
          email: "admin@example.com",
          phone: "+965857888",
          type: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
