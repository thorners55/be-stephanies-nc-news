const { selectUser } = require("../models/users-model.js");

exports.getUser = (req, res, next) => {
  console.log("inside getUser in users controller");
  const reqUsername = req.params.username;
  selectUser(reqUsername)
    .then((users) => {
      console.log(users);
      if (users.length === 0)
        res
          .status(400)
          .send({ msg: "400 Bad Request: username does not exist" });
      else res.status(200).send(users[0]);
    })
    .catch(next);
};
