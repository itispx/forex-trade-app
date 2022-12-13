import { IAPIError } from "interfaces-common";

class APIError extends Error implements IAPIError {
  status: { code: number | string; ok: boolean };
  error: { message: string };

  constructor(public code: number | string, public message: string) {
    super();

    this.status = { code: checkCode(code), ok: isOk(code) };
    this.error = { message };

    Object.setPrototypeOf(this, APIError.prototype);
  }

  static unauthorizedRequest() {
    return new APIError(401, "Unauthorized");
  }

  static badRequest() {
    return new APIError(422, "Bad request");
  }

  static notFound() {
    return new APIError(404, "Document not found");
  }

  static conflict() {
    return new APIError(409, "Conflict");
  }

  static internal() {
    return new APIError(500, "Something went wrong");
  }
}

function isOk(code: number | string) {
  switch (code) {
    case 200:
      return true;
    case 201:
      return true;
    case 304:
      return true;
    case 11000:
      return false;
    default:
      return false;
  }
}

function checkCode(code: number | string) {
  switch (code) {
    default:
      return code;
  }
}

export default APIError;
