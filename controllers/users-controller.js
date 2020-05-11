const { selectUser } = require("../models/users-model.js");

exports.getUser = (req, res, next) => {
  console.log("inside getUser in users controller");
  const reqUsername = req.params.username;
  selectUser(reqUsername)
    .then(([user]) => {
      console.log(user);
      res.status(200).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
