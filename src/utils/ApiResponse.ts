/**
 * Class representing an API response.
 */
export class ApiResponse {
    statusCode: number;
    data: any;
    message: string;
    success: boolean;
    /**
     * Constructor for ApiResponse class.
     * @param {number} statusCode - HTTP status code for the response.
     * @param {any} data - Data to be included in the response body.
     * @param {string} message - Response message (default: "Success").
     */
  
    constructor(statusCode: number, data: any, message = "Success") {
      this.statusCode = statusCode; 
      this.data = data; 
      this.message = message; 
      this.success = statusCode < 400; 
    }
  }
  
  export default ApiResponse;
  