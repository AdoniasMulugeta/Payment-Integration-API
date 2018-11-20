//importing third-party modules
const router = require("express").Router();
//importing custom modules
const transactionController = require("./transaction-controller");
const transactionValidator  = require("./transaction-validation");
const accessControl  = require("../auth/access-control");

//define http get request route

router.get ('/',
    accessControl.role.ADMIN,
    transactionController.getTransactions
);

router.get ('/:id',
    accessControl.role.USER,
    accessControl.OWNER,
    transactionController.getTransaction
);

router.post ('/',
    accessControl.role.USER,
    transactionValidator.create,
    transactionController.createTransaction
);

module.exports = router;
