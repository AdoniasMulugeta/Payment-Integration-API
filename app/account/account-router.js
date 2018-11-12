//importing third-party modules
const router = require("express").Router();

//importing custom modules
const accountController = require("./account-controller");
const accountValidator  = require("./account-validation");

//define http routes
router.get   ('/',                      accountController.getAccounts);
router.get   ('/:account',              accountController.getAccount);
router.get   ('/:account/balance',      accountController.getBalance);
router.get   ('/:account/transactions', accountController.getTransactions);
router.post  ('/:account/transfer',     accountController.transfer);


module.exports = router;
