/**
 * Custom Error class for API errors.
 * Inherits from the built-in Error class.
 */

export class ApiError extends Error {
  statusCode: number;
  data: unknown;
  success: boolean;
  errors: string[];
  /**
   * Constructor for ApiError class.
   * @param {number} statusCode - HTTP status code for the error.
   * @param {string} message - Error message (default: "Something went wrong").
   * @param {Array<string>} errors - Array of error details or validation errors (default: string[]).
   * @param {string} stack - Error stack trace (default: "").
   */

  constructor(
    statusCode: number,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);

    // Initialize instance properties
    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
