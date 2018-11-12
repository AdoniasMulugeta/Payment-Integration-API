

const app = require('../../app');
const userModel = require('../../app/user/user-model');
const request = require('supertest');
const data = require('../../config/test-data');


exports.deleteAll = async () => {
    await userModel.deleteMany({});
};
exports.signUp = async ({name, email, password, role}) => {
    return await request(app).post('/users/signup').send({
        name: name,
        email: email,
        password: password,
        role: role
    })
};
exports.logIn = async ({email, password})=>{
    return await request(app).post('/users/login').send({
        email: email,
        password : password
    })
};
exports.getUser = async id => {
  return await request(app).get('/users/'+ id);
};

exports.getUsers = async () => {
  return await request(app).get('/users');
};
exports.updateUser = async (token, id, data)=>{
    return await request({
        method : 'PUT',
        uri : `/users/${id}`,
        body : data
    });
};