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

exports.handler400 = (req, res) => {
  console.log("inside handler400)");
  return res.status(400).send({
    msg: "400 Bad Request: Cannot access information - invalid request",
  });
};

exports.handlePSQLErrors = (err, req, res, next) => {
  console.log({ err }, " <--");
  const { status, msg } = err;
  const errorCodes = {
    "22P02": {
      status: 400,
      msg: "400 Bad Request: Cannot access information - invalid request",
    },
    "23503": {
      status: 422,
      msg: "422 Unprocessable Entity - article id does not exist",
    },
    "42703": {
      status: 422,
      msg: "422 Unprocessable Entity - sort_by or order request does not exist",
    },
  };
  console.log(err.status);
  if (err.constraint === "comments_author_foreign") {
    errorCodes["23503"].msg =
      "422 Unprocessable Entity - username does not exist";
  } else if (err.code in errorCodes) {
    const { status, msg } = errorCodes[err.code];
    res.status(status).send({ msg });
  } else if (err.msg === "article not found") {
    console.log(err);

    console.log(msg);
    res.status(status).send({ msg });
  } else if (err.msg === "username not found") {
    res.status(status).send({ msg });
  } else if (status === 422) {
    res.status(status).send({ msg });
  } else next(err);
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log("unhandled error", err);
  res.status(500).send({ msg: "Internal server error" });
};
