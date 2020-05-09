const express = require("express");
const commentsRouter = express.Router();
const {
  patchCommentById,
  deleteCommentById,
} = require("../controllers/comments-controller.js");
const { handler405 } = require("../controllers/errors-controller.js");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(handler405);

module.exports = { commentsRouter };
