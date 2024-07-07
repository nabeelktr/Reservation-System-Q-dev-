export enum StatusCode {
    // Successful responses (200–299)
    OK = 200,
    Created = 201,
    Accepted = 202,
    NotModified = 304,

    // Client error responses (400–499)
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    NotAcceptable = 406,

    // Server error responses (500–599)
    InternalServerError = 500,
    NotImplemented = 501,
     BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
  }
  

  