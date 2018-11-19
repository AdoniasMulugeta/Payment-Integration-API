

const app = require('../../app');
const userModel = require('../../app/user/user-model');
const request = require('supertest');
const data = require('../../config/test-data');


exports.deleteAll = async () => {
    await userModel.deleteMany({});
};

exports.setupUser = async () => {
    const {name, email, password, role} = data;
    await this.signUp({name, email, password, role});
    let response = await this.signIn({email, password});
    let token = response.body.data.token;
    let id = response.body.data._id;
    return {token:token, id:id};
};

exports.signUp = async ({name, email, password, role}) => {
    return await request(app).post('/users/signup').send({
        name: name,
        email: email,
        password: password,
        role: role
    })
};
exports.signIn = async ({email, password})=>{
    return await request(app).post('/users/signin').send({
        email: email,
        password : password
    });
};
exports.getUser = async (id, token) => {
  return await request(app).get('/users/'+ id).set('Authorization', "bearer "+token);
};

exports.getUsers = async token => {
  return await request(app).get('/users').set('Authorization', "bearer "+token);
};
exports.updateUser = async (id, data, token)=>{
    return await request(app).put('/users/'+id).set('Authorization', "bearer "+token).send(data);
};