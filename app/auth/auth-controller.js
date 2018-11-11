//importing third-party modules
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');

//importing custom modules
const CONFIG = require('../../config');
const userDal = require('../user/user-dal');

//middleware to handle user Login
exports.logIn  = async (request, response) => {
    const data = request.body;
    let user = await userDal.getUser({email : data.email});
    if(!user) {
        sendError(response);
        return;
    }
    var passwordsMatch = await bcrypt.compare(data.password, user.password);

    if(!passwordsMatch){
        sendError(response);
        return
    }

    const token = jwt.sign({_id: user._id}, CONFIG.JWT_SECRET,{expiresIn: 60*60 });//expires in 1 hour

    response.status(200).json({
        status : 200,
        type : "Success",
        data : {
            _id:   user._id,
            name:  user.name,
            email: user.email,
            role:  user.role,
            token: token,
            created_at: user.created_at,
            updated_at: user.updated_at
        }
    });
};

//middleware to handle user sign-up
exports.signUp = async (request, response) => {
    let data      = request.body;
    data.password = await bcrypt.hash(data.password, CONFIG.SALT_ROUNDS);
    data.role     = data.role || "USER";
    const user    = await userDal.createUser(data);
    response.status(201).json({
        status: 201,
        type: "success",
        data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        }
    });
};

//middleware to validate incoming token and attach the user id on the request object
exports.tokenValidator = async (request, response, next)=>{
    const token = request.headers['authorization'];
    if(!token){
        response.status(400).json({
            status : 400,
            type: "error",
            error:{
                err_code : "TOKEN_MISSING",
                msg: "No authentication token found in header"
            }
        });
        return;
    }
    try{
        const payload    = await jwt.verify(token.split(' ')[1],CONFIG.JWT_SECRET);
        request.body._id = payload._id;
        next();
    }
    catch(error) {
        response.json({
            status : 400,
            type: "Error",
            error:{
                msg: error.message,
                err_code : "INVALID_TOKEN"
            }
        });
    }
};

//helper functions
function sendError(response) {
    response.status(400).json({
        status: 400,
        type: "error",
        errors: [
            {
                msg: "Authentication Failed",
                error_code: "AUTH_FAILED"
            }
        ]
    });
}