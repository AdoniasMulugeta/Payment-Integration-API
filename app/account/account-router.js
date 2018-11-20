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
    accountValidator.checkAccount,
    accountController.getAccount
);

router.get ('/:account/balance',
    accessControl.role.USER,
    accountValidator.checkAccount,
    accountController.getBalance
);

router.get ('/:account/transactions',
    accessControl.role.USER,
    accountValidator.checkAccount,
    accountController.getTransactions
);

router.get ('/:account/transactions/:id',
    accessControl.role.USER,
    accountValidator.checkAccount,
    accountController.getTransactions
);

router.post ('/:account/transfer',
    accessControl.role.USER,
    accountValidator.checkAccount,
    accountController.transfer
);

router.post ('/:account/transactions/:id/refund',
    accessControl.role.USER,
    accountValidator.checkAccount,
    accountController.refund
);

router.put ('/:account',
    accessControl.role.USER,
    accountValidator.checkAccount,
    accountController.updateAccount
);

router.delete ('/:account',
    accessControl.role.USER,
    accountValidator.checkAccount,
    accountController.removeAccount
);

module.exports = router;
