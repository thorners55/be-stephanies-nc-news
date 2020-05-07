const express = require("express");
const topicsRouter = express.Router();
const { getTopics } = require("../controllers/topics-controller.js");
const { handler405 } = require("../controllers/errors-controller.js");

topicsRouter.route("/").get(getTopics).all(handler405);

module.exports = { topicsRouter };
