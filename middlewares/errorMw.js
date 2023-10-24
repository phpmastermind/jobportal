const errorMv = (err, req, res, next) => {
  if (err) {
    console.log(err);
    const defaultErrors = {
      statusCode: 500,
      message: err,
    };
    // missing field error
    if (err.name == "ValidationError") {
      defaultErrors.statusCode = 400;
      defaultErrors.message = Object.values(err.errors)
        .map((item) => item.message)
        .join(", ");
    }
    if (err.code && err.code == 11000) {
      defaultErrors.statusCode = 400;
      defaultErrors.message = `${Object.keys(err.keyValue)} already exist`;
    }

    res.status(defaultErrors.statusCode).json({
      message: defaultErrors.message,
    });
  }
};

export default errorMv;
