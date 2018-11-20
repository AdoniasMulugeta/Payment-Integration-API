const STATIC = require('../../lib/STATIC');
exports.role = {
    ADMIN : (request, response, next) => {
            request.role === STATIC.ROLE.ADMIN ? next() : sendError(request, response)
    },
    USER :  (request, response, next) => {
        request.role === STATIC.ROLE.USER || STATIC.ROLE.ADMIN ? next() : sendError(request, response)
    }
};
exports.OWNER = (request, response, next)=>{
  //todo check if the user is accessing his/hers information or is an ADMIN
};
function sendError(request ,response){
    response.status(403).json({
        status : 403,
        type: "error",
        errors: [
            {
                location : "header",
                param : "role",
                msg : "Not Authorized, request doesn't have appropriate ROLE to access this resource",
                value : request.role
            }
        ]
    });
}