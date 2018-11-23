const app = require('../../app');
const accountModel = require('../../app/account/account-model');
const request = require('supertest');
const data = require('../../config/test-data');
const userTestConfig = require('../user/user-test-config');
const FiTestConfig = require('../FI/FI-test-config');
let token = '';

exports.setupAccount = async ({FIName}) => {
    const fi_id = await FiTestConfig.setupFI({fi_name: FIName});
    const {id, token} = await userTestConfig.setupUser('ADMIN');
    return {fi_id, client_id:id, token}
};

exports.mSetupAccount = async ({email, password, role, FIName}) => {
    const fi_id = await FiTestConfig.setupFI({fi_name: FIName});
    const {id, token} = await userTestConfig.mSetupUser({email, password, role});
    return {fi_id, client_id:id, token}
};

exports.deleteAll = async () => {
    await accountModel.deleteMany({});
    userTestConfig.deleteAll();
    FiTestConfig.deleteAll();
};


exports.createAccount = async (uid, data, token)=>{
    return await request(app).post(`/users/${uid}/accounts`).set('Authorization', "bearer "+token).send(data);
};

exports.getAccount = async (id, uid, token) => {
    return await request(app).get(`/users/${uid}/accounts/${id}`).set('Authorization', "bearer "+token);
};

exports.getAccounts = async (uid, token) => {
    return await request(app).get(`/users/${uid}/accounts`).set('Authorization', "bearer "+token);
};

exports.updateAccount = async (id, uid, data, token)=>{
    return await request(app).put(`/users/${uid}/accounts/${id}`).set('Authorization', "bearer "+token).send(data);
};

exports.removeAccount = async (id, uid, token)=>{
    return await request(app).delete(`/users/${uid}/accounts/${id}`).set('Authorization', "bearer "+token)
};