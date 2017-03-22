// @flow
import MissingParameterException from '../exceptions/MissingParameterException';

export default class GuardAgainstMissingParameter {
  parameters: Object;
  paramsToValidate: Array<string>;
  customExceptionMessage: string;

  constructor(parameters: Object, paramsToValidate: Array<string>, customExceptionMessage: void) {
    this.parameters = parameters;
    this.paramsToValidate = paramsToValidate;

    this.customExceptionMessage = `Required parameters : [${paramsToValidate.join()}]`;

    if(typeof customExceptionMessage !== "undefined") {
      this.customExceptionMessage = customExceptionMessage;
    }
  }

  guard() {

    var self = this;

    this.paramsToValidate.forEach(function(param) {

      if(!self.parameters[param]) {
        throw new MissingParameterException(self.customExceptionMessage);
      }
    });
  }
}