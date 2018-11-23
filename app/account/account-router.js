//importing third-party modules
const router = require("express").Router();

//importing custom modules
const accountController = require("./account-controller");
const accountValidator  = require("./account-validator");
const accessControl  = require("../auth/access-control");

//define http routes
router.get ('/',
    accessControl.role.USER,
    accountController.getAccounts
);

router.get ('/:account',
    accessControl.role.USER,
    accountValidator.checkAccountExists,
    accountController.getAccount
);

router.get ('/:account/balance',
    accessControl.role.USER,
    accountValidator.checkAccountExists,
    accountController.getBalance
);

router.get ('/:account/transactions',
    accessControl.role.USER,
    accountValidator.checkAccountExists,
    accountController.getTransactions
);

router.get ('/:account/transactions/:id',
    accessControl.role.USER,
    accountValidator.checkAccountExists,
    accountController.getTransactions
);

router.post ('/:account/transfer',
    accessControl.role.USER,
    accountValidator.checkAccountExists,
    accountController.transfer
);

router.post ('/:account/transactions/:id/refund',
    accessControl.role.USER,
    accountValidator.checkAccountExists,
    accountController.refund
);

router.post('/',
    accessControl.role.USER,
    accountValidator.createAccount,
    accountController.createAccount
);

router.put ('/:account',
    accessControl.role.USER,
    accountValidator.checkAccountExists,
    accountController.updateAccount
);

router.delete ('/:account',
    accessControl.role.USER,
    accountValidator.checkAccountExists,
    accountController.removeAccount
);

module.exports = router;
