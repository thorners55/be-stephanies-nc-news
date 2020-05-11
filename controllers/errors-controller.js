exports.handler404 = (req, res, next) => {
  console.log("inside handler404");
  res.status(404).send({ msg: "404 Bad Request: Not found" });
};

exports.handler405 = (req, res) => {
  console.log("inside handler405");
  res.status(405).send({ msg: "405 Bad Request: Method Not Allowed" });
};

exports.handler400 = (req, res) => {
  console.log("inside handler400");
  res.status(400).send({
    msg: "400 Bad Request: Cannot access information - invalid request",
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
  if (err.code in errorCodes) {
    const { status, msg } = errorCodes[err.code];
    res.status(status).send({ msg });
  } else next(err);
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log("unhandled error", err);
  res.status(500).send({ msg: "Internal server error" });
};
