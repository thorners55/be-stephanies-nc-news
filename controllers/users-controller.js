const { selectUser } = require("../models/users-model.js");

exports.getUser = (req, res, next) => {
  console.log("inside getUser in users controller");
  const reqUsername = req.params.username;
  selectUser().then((users) => {
    const userObject = users.find((object) => {
      return object.username === reqUsername;
    });
    res.status(200).send(userObject);
  });

  //const user = req.params.username;
};
