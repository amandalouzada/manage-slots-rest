
interface ErrorInterface {
  message?: string;
  errors?: string[];
  httpCode?: number;
}

class ErrorLib {

  private error: ErrorInterface
  public isErrorLib = true

  public constructor(error: ErrorInterface) {
    this.error = error;
  }

  public getErrorJson() {
    const { message, errors } = this.error;
    return {message, errors}
  }

  public getMessage() {
    return this.error.message;
  }

  public getErrors() {

    return this.error.errors || null;
  }

  public getHttpCode() {
    return this.error.httpCode || null;
  }

};

export default ErrorLib;
