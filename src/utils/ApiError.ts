/**
 * Custom Error class for API errors.
 * Inherits from the built-in Error class.
 */

export class ApiError extends Error {
    statusCode: any;
    data: null;
    success: boolean;
    errors: never[];
    /**
     * Constructor for ApiError class.
     * @param {number} statusCode - HTTP status code for the error.
     * @param {string} message - Error message (default: "Something went wrong").
     * @param {Array} errors - Array of error details or validation errors (default: []).
     * @param {string} stack - Error stack trace (default: "").
     */
  
    constructor(
      statusCode: any,
      message = "Something went wrong",
      errors = [],
      stack = ""
    ) {
      super(message);
  
      // Initialize instance properties
      this.statusCode = statusCode; 
      this.data = null; 
      this.message = message; 
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
  