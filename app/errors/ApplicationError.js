class ApplicationError extends Error {
  constructor (statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ApplicationError;