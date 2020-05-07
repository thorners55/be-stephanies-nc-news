const express = require("express");
const usersRouter = express.Router();
const { getUser } = require("../controllers/users-controller.js");
const { handler405 } = require("../controllers/errors-controller.js");

usersRouter.route("/:username").get(getUser).all(handler405);

module.exports = { usersRouter };
