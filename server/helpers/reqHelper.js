const requestHelper = {
  success(res, statusCode, message, data) {
    if (data) {
      res.status(statusCode).json(Object.assign({
        success: true,
        message
      }, data));
    } else {
      res.status(statusCode).json({
        success: true,
        message
      });
    }
  },
  error(res, statusCode, errors) {
    res.status(statusCode).json({
      success: false,
      errors
    });
  }
};

export default requestHelper;
