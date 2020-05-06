const { selectArticles } = require("../models/articles-model.js");

exports.getArticles = (req, res, next) => {
  console.log("inside getArticles controller func");
  selectArticles().then((articles) => {
    console.log(articles);
    res.status(200).send(articles);
  });
};
