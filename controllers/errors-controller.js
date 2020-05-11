exports.handler404 = (req, res, next) => {
  console.log("inside handler404");
  console.log(req.body);

  res.status(404).send({ msg: "404 Bad Request: Not found" });
  // route would be 404
};

exports.handler405 = (req, res) => {
  console.log("inside handler405");
  console.log(req.body);
  res.status(405).send({ msg: "405 Bad Request: Method Not Allowed" });
};

exports.handler400 = (req, res) => {
  console.log("inside handler400");
  res.status(400).send({
    msg: "400 Bad Request: Cannot access information - invalid request",
  });
};

exports.handler422 = (req, res) => {
  console.log("inside handler 422");
  const { query } = req;
  reqQueryKeys = Object.keys(query);
  if (reqQueryKeys.includes("author" || "topic")) {
    return res.status(422).send({
      status: 422,
      msg: "422 Unprocessable Entity - author or topic does not exist",
    });
  } else
    return res.status(422).send({
      status: 422,
      msg: "422 Unprocessable Entity - sort_by or order request invalid",
    });
};

exports.handleCustomErrors = (err, req, res, next) => {
  const { status, msg } = err;
  if (err.msg !== undefined) {
    res.status(status).send({ msg });
  }
  next(err);
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
      status: 400,
      msg: "sort_by or order request invalid",
    },
  };
  console.log(err.status);
  if (err.code in errorCodes) {
    const { status, msg } = errorCodes[err.code];
    res.status(status).send({ msg });
  } else next(err);
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log("unhandled error", err);
  res.status(500).send({ msg: "Internal server error" });
};
