//importing third-party modules
const router = require("express").Router();
//importing custom modules
const FIController  = require("./FI-controller");
const FIValidator   = require("./FI-validation");
const accessControl = require("../auth/access-control");

//define http get request route

router.get ('/',
    FIController.getFIs
);

router.get ('/:id',
    FIController.getFI
);

router.post ('/',
    FIValidator.create,
    FIController.createFI
);

router.put ('/:id',
    FIValidator.update ,
    FIController.updateFI
);

router.delete ('/:id',
    FIController.removeFI
);


module.exports = router;
