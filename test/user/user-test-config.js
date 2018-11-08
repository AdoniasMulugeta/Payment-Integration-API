

const app = require('../../app');
const userModel = require('../../app/user/user-model');
const request = require('supertest');
const data = require('../../config/test-data');


exports.deleteAll = async () => {
    await userModel.deleteMany({});
};
exports.signUp = async ({name, email, password, role}) => {
    return request(app).post('/auth/signup').send({
        name: name,
        email: email,
        password: password,
        role: role
    })
};
exports.logIn = ({email, password})=>{
    return request(app).post('/auth/signin')
}