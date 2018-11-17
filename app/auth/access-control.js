const STATIC = require('../../lib/STATIC');
exports.role = {
    ADMIN : (request, response, next) => {
            request.role === STATIC.ROLE.ADMIN ? next() : sendError()
    },
    USER :  (request, response, next) => {
        request.role === STATIC.ROLE.USER ? next() : sendError();
    },

    ADMIN_OR_USER :  (request, response, next) => {
        request.role === STATIC.ROLE.USER || STATIC.ROLE.ADMIN ? next() : sendError()
    }
};

function sendError(){
    response.status(403).json({
        status : 403,
        type: "error",
        errors: [
            {
                msg : "Not Authorized"
            }
        ]
    });
}