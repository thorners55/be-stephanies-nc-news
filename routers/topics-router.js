const express = require("express");
const topicsRouter = express.Router();
const { getTopics } = require("../controllers/topics-controller.js");

topicsRouter
  .route("/")
  .get(getTopics)
  .all((req, res) => {
    res.status(405).send("405 Method Not Allowed");
  });

module.exports = { topicsRouter };
