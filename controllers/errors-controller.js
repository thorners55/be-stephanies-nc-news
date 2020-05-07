exports.handler404 = (req, res, next) => {
  console.log("inside handler400");
  console.log(req.body);
  res.status(404).send({ msg: "404 Bad Request: Route not found" });
  // route would be 404
};

exports.handler405 = (req, res) => {
  console.log("inside handler405");
  console.log(req.body);
  res.status(405).send({ msg: "405 Bad Request: Method Not Allowed" });
};

exports.handlePSQLErrors = (err, req, res, next) => {
  console.log({ err }, " <--");
  const errorCodes = {
    "22P02": {
      status: 400,
      msg: "400 Bad Request: Cannot access information - invalid input",
    },
    "23503": { status: 422, msg: "article id does not exist" },
  };
  if (err.constraint === "comments_author_foreign") {
    errorCodes["23503"].msg = "username does not exist";
  }
  if (err.code in errorCodes) {
    const { status, msg } = errorCodes[err.code];
    res.status(status).send({ msg });
  } else next(err);
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log("unhandled error", err);
  res.status(500).send({ msg: "Internal server error" });
};

//exports.handleCustomErrors = (err, req, res, next) => {};
