const { updateCommentVotes } = require("../models/comments-model.js");

exports.patchCommentById = (req, res, next) => {
  console.log("inside getComments in comments controller");
  console.log(req.params);
  const incVotes = parseInt(req.body.inc_votes);
  const reqCommentId = parseInt(req.params.comment_id);
  console.log(reqCommentId, incVotes);
  updateCommentVotes(reqCommentId, incVotes)
    .then((comment) => {
      console.log(comment);
      return res.status(200).send({ comment });
    })
    .catch((err) => {
      next(err);
    });
};
