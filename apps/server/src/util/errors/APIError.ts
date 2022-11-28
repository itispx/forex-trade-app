import { IAPIError } from "interfaces-common";

class APIError implements IAPIError {
  status: { code: number; ok: boolean };
  error: { message: string };

  constructor(public code: number, public message: string) {
    this.status = { code: checkCode(code), ok: isOk(code) };
    this.error = { message };
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

function isOk(code: number) {
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

function checkCode(code: number) {
  switch (code) {
    case 11000:
      return 409;
    default:
      return code;
  }
}

export default APIError;
