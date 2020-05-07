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
  };
  if (err.code in errorCodes) {
    const { status, msg } = errorCodes[err.code];
    res.status(400).send({ msg });
  } else next(err);
};

exports.handleInternalErrors = (err, req, res, next) => {
  console.log("unhandled error", err);
  res.status(500).send({ msg: "Internal server error" });
};

//exports.handleCustomErrors = (err, req, res, next) => {};
