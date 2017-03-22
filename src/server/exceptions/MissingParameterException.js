// @flow
export default class MissingParameterException extends Error {
  message: string;
  name: string;
  type: string;
  code: number;

  constructor(message: string) {
    if(typeof message == 'undefined') {
      message = 'Invalid request, a parameter is missing';
    }

    super(message);

    this.message = message;
    this.name = 'MissingParameterException';
    this.type = 'CustomException';
    this.code = 422;
  }
}
