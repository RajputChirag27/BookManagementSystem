export const errorMessages: { [key: number]: string } = {
    100: 'Continue: The client should continue with its request.',
    101: 'Switching Protocols: The server is switching protocols according to Upgrade header.',
    102: 'Processing: The server has received and is processing the request, but no response is available yet.',
    103: 'Early Hints: Used to return some response headers before the final HTTP message.',
    200: 'OK: The request has succeeded.',
    201: 'Created: The request has been fulfilled, and a new resource has been created.',
    202: 'Accepted: The request has been accepted for processing, but the processing has not been completed.',
    203: 'Non-Authoritative Information: The returned meta-information is not the definitive set available from the origin server.',
    204: 'No Content: The server has fulfilled the request, but there is no new information to return.',
    205: 'Reset Content: The server successfully processed the request, but requires the requester to reset the document view.',
    206: 'Partial Content: The server is delivering only part of the resource due to a range header sent by the client.',
    207: 'Multi-Status: The message body that follows is by default an XML message and can contain a number of separate response codes, depending on how many sub-requests were made.',
    208: 'Already Reported: The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response, and are not being included again.',
    226: 'IM Used: The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance.',
    300: 'Multiple Choices: Indicates multiple options for the resource from which the client may choose.',
    301: 'Moved Permanently: This and all future requests should be directed to the given URI.',
    302: 'Found: Tells the client to look at another URL.',
    303: 'See Other: The response to the request can be found under another URI using a GET method.',
    304: 'Not Modified: Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.',
    305: 'Use Proxy: The requested resource is available only through a proxy, whose address is provided in the response.',
    307: 'Temporary Redirect: Tells the client to resend the request to the new location.',
    308: 'Permanent Redirect: The request and all future requests should be repeated using another URI.',
    400: 'Bad Request: The server cannot or will not process the request due to an apparent client error.',
    401: 'Unauthorized: Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided.',
    402: 'Payment Required: Reserved for future use.',
    403: 'Forbidden: The request was valid, but the server is refusing action. The user might not have the necessary permissions for a resource.',
    404: 'Not Found: The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.',
    405: 'Method Not Allowed: A request method is not supported for the requested resource.',
    406: 'Not Acceptable: The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.',
    407: 'Proxy Authentication Required: The client must first authenticate itself with the proxy.',
    408: 'Request Timeout: The server timed out waiting for the request.',
    409: 'Conflict: Indicates that the request could not be processed because of conflict in the request.',
    410: 'Gone: Indicates that the resource requested is no longer available and will not be available again.',
    411: 'Length Required: The request did not specify the length of its content, which is required by the requested resource.',
    412: 'Precondition Failed: The server does not meet one of the preconditions that the requester put on the request.',
    413: 'Payload Too Large: The request is larger than the server is willing or able to process.',
    414: 'URI Too Long: The URI provided was too long for the server to process.',
    415: 'Unsupported Media Type: The request entity has a media type which the server or resource does not support.',
    416: 'Range Not Satisfiable: The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.',
    417: 'Expectation Failed: The server cannot meet the requirements of the Expect request-header field.',
    418: 'I\'m a teapot: The server refuses to brew coffee because it is, permanently, a teapot.',
    421: 'Misdirected Request: The request was directed at a server that is not able to produce a response.',
    422: 'Unprocessable Entity: The request was well-formed but was unable to be followed due to semantic errors.',
    423: 'Locked: The resource that is being accessed is locked.',
    424: 'Failed Dependency: The request failed due to failure of a previous request.',
    425: 'Too Early: Indicates that the server is unwilling to risk processing a request that might be replayed.',
    426: 'Upgrade Required: The client should switch to a different protocol such as TLS/1.0.',
    428: 'Precondition Required: The origin server requires the request to be conditional.',
    429: 'Too Many Requests: The user has sent too many requests in a given amount of time.',
    431: 'Request Header Fields Too Large: The server is unwilling to process the request because its header fields are too large.',
    451: 'Unavailable For Legal Reasons: The server is denying access to the resource as a consequence of a legal demand.',
    500: 'Internal Server Error: A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.',
    501: 'Not Implemented: The server either does not recognize the request method, or it lacks the ability to fulfill the request.',
    502: 'Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.',
    503: 'Service Unavailable: The server cannot handle the request due to temporary overload or maintenance of the server.',
    504: 'Gateway Timeout: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.',
    505: 'HTTP Version Not Supported: The server does not support the HTTP protocol version used in the request.',
    506: 'Variant Also Negotiates: Transparent content negotiation for the request results in a circular reference.',
    507: 'Insufficient Storage: The server is unable to store the representation needed to complete the request.',
    508: 'Loop Detected: The server detected an infinite loop while processing the request.',
    509: 'Bandwidth Limit Exceeded: The server has exceeded the bandwidth specified by the server administrator.',
    510: 'Not Extended: Further extensions to the request are required for the server to fulfill it.',
    511: 'Network Authentication Required: The client needs to authenticate to gain network access.',
};
