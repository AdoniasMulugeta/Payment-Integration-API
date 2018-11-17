//importing third-party modules
const router = require("express").Router();

//importing custom modules
const accountController = require("./account-controller");
const accountValidator  = require("./account-validator");

//define http routes
router.get   ('/',                          accountController.getAccounts);
router.get   ('/:account',                  accountValidator.checkAccount,  accountController.getAccount);
router.get   ('/:account/balance',          accountValidator.checkAccount,  accountController.getBalance);
router.get   ('/:account/transactions',     accountValidator.checkAccount,  accountController.getTransactions);
router.get   ('/:account/transactions/:id', accountValidator.checkAccount,  accountController.getTransactions);

router.post  ('/create',                           accountValidator.createAccount, accountController.createAccount);
router.post  ('/:account/transfer',                accountValidator.checkAccount,  accountController.transfer);
router.post  ('/:account/transactions/:id/refund', accountValidator.checkAccount,  accountController.refund);

router.put    ('/:account', accountValidator.checkAccount, accountController.updateAccount);
router.delete ('/:account', accountValidator.checkAccount, accountController.removeAccount);

module.exports = router;
