const {
  updateCommentVotes,
  removeComment,
} = require("../models/comments-model.js");
const {
  handler404,
  handler400,
  handler422,
} = require("./errors-controller.js");

exports.patchCommentById = (req, res, next) => {
  console.log("inside patchCommentById in comments controller");
  console.log(req.params);
  console.log(req.body);
  const incVotes = parseInt(req.body.inc_votes);
  const reqCommentId = parseInt(req.params.comment_id);
  const reqKeys = Object.keys(req.body);
  console.log(reqKeys);
  if (reqKeys.length > 1) handler400(req, res);
  else
    updateCommentVotes(reqCommentId, incVotes)
      .then((comment) => {
        console.log(comment);
        if (comment.length === 0) handler404(req, res);
        else {
          console.log(comment);
          return res.status(200).send({ comment });
        }
      })
      .catch((err) => {
        next(err);
      });
};

exports.deleteCommentById = (req, res, next) => {
  console.log("inside deleteCommentById function in comments controller");
  console.log(req.params);
  const { comment_id } = req.params;
  const commentId = parseInt(comment_id);
  removeComment(commentId).then((deleteCount) => {
    console.log(deleteCount);
    if (deleteCount === 0) handler404(req, res);
    else return res.status(204).send();
  });
};
