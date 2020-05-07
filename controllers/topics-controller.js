const { selectTopics } = require("../models/topics-model.js");

exports.getTopics = (req, res, next) => {
  console.log("inside getTopics controller func");
  selectTopics().then((topics) => {
    console.log(topics);
    res.status(200).send({ topics });
  });
};
