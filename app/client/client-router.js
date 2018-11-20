//importing third-party modules
const router = require("express").Router();
//importing custom modules
const clientController = require("./client-controller");
const clientValidator  = require("./client-validation");
const authController = require("../auth/auth-controller");
const authValidator  = require("../auth/auth-validator");
const accessControl  = require("../auth/access-control");

//define http get request route

router.get ('/',
    accessControl.role.ADMIN,
    clientController.getClients
);

router.get ('/:id',
    accessControl.role.USER,
    accessControl.OWNER,
    clientController.getClient
);

router.post ('/',
    accessControl.role.USER,
    clientValidator.create,
    clientController.createClient
);

router.put ('/:id',
    accessControl.role.USER,
    accessControl.OWNER,
    clientValidator.update ,
    clientController.updateClient
);

router.delete ('/:id',
    accessControl.role.USER,
    accessControl.OWNER,
    clientController.removeClient
);


module.exports = router;
