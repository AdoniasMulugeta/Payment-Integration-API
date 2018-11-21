//importing third-party modules
const router = require("express").Router();
//importing custom modules
const userController = require("./user-controller");
const userValidator  = require("./user-validation");
const authController = require("../auth/auth-controller");
const authValidator  = require("../auth/auth-validator");
const accessControl  = require("../auth/access-control");

//define http get request route


router.post ('/signup',
    authValidator.signUp,
    authController.signUp
);

router.post ('/signin',
    authValidator.signIn,
    authController.signIn
);

router.get ('/',
    authController.tokenValidator,
    accessControl.role.ADMIN,
    userController.getUsers
);
router.get ('/:id',
    authController.tokenValidator,
    userController.getUser
);

router.put ('/:id',
    authController.tokenValidator,
    userValidator.update ,
    userController.updateUser
);

router.delete ('/:id',
    authController.tokenValidator,
    userController.removeUser
);


module.exports = router;
