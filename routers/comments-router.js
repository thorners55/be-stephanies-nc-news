const express = require("express");
const commentsRouter = express.Router();
const { patchCommentById } = require("../controllers/comments-controller.js");

commentsRouter.route("/:comment_id").patch(patchCommentById);

module.exports = { commentsRouter };
