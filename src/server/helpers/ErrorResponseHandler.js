// @flow
export default class ErrorResponseHandler {
  res: Object;
  e: Object;

  constructor(res: Object, e: Object) {
    this.res = res;
    this.e = e;
  }

  writeResponse() {
    // Custom Exception Handling
    if(this.e.type === 'CustomException') {
      this.res.status(this.e.code).json({
        errorMessage: this.e.message
      });
      return true;
    }

    if(this.e.name === 'MongoError' || this.e.name === 'CastError') {
      this.res.status(500).json({
        errorMessage: this.e.message
      });
      return true;
    }

    // Unexpected Exception
    this.res.status(500).json({
      errorMessage: 'Unexpected error, please contact support'
    });
  }
}
