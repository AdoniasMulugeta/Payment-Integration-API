const app = require('../../app');
const accountModel = require('../../app/account/account-model');
const request = require('supertest');
const data = require('../../config/test-data');
const userTestConfig = require('../user/user-test-config');
let token = '';

(async function setupUser(){
    const {name, email, password, role} = data;
    await userTestConfig.signUp({name, email, password, role});
    const user  = await userTestConfig.logIn(email, password);
    token = user.data.token;
})();

exports.deleteAll = async () => {
    await accountModel.deleteMany({});
};
exports.createAccount = async () => {
    request.post("/accounts/create").set('authorization',`bearer ${token}`);
};