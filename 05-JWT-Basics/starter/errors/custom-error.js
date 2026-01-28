class CustomAPIError extends Error {
  constructor(message) {
    super(message)
  }
  /* constructor(message, statusCode) {
    super(message)
    this.statusCode = statusCode
  } */
}

module.exports = CustomAPIError
