const {
  updateCommentVotes,
  removeComment,
} = require("../models/comments-model.js");

exports.patchCommentById = (req, res, next) => {
  console.log("inside patchCommentById in comments controller");
  const incVotes = req.body.inc_votes;
  const reqCommentId = req.params.comment_id;

  updateCommentVotes(reqCommentId, incVotes)
    .then(([comment]) => {
      return res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentById = (req, res, next) => {
  console.log("inside deleteCommentById function in comments controller");
  const { comment_id } = req.params;
  removeComment(comment_id)
    .then((deleteCount) => {
      res.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
