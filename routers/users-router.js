const express = require("express");
const usersRouter = express.Router();
const { getUser } = require("../controllers/users-controller.js");

usersRouter.route("/:username").get(getUser);

module.exports = { usersRouter };
