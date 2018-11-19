const app = require('../../app');
const accountModel = require('../../app/account/account-model');
const request = require('supertest');
const data = require('../../config/test-data');
const userTestConfig = require('../user/user-test-config');
let token = '';

async function setupUser(){
    const {name, email, password, role} = data;
    await userTestConfig.signUp({name, email, password, role});
    const response  = await userTestConfig.signIn(email, password);
    token = response.body.data.token;
    id = response.body._id;
    return {token, id}
};

exports.deleteAll = async () => {
    await accountModel.deleteMany({});
};
exports.createAccount = async () => {
    request.post("/accounts/create").set('authorization',`bearer ${token}`);
};