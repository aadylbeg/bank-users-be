const express = require("express");
const auth = require("../controllers/auth");
const users = require("../controllers/userControllers");

const router = express.Router();

router.post("/login", auth.login);
router.get("/users/:phone", users.getUser);

router.use(auth.protect, auth.isAdmin);
router.get("/users", users.getAllUsers);
router.post("/users", users.createUser);

module.exports = router;
