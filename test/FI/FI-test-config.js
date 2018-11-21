

const app = require('../../app');
const FIModel = require('../../app/FI/FI-model');
const request = require('supertest');
const data = require('../../config/test-data');



exports.deleteAll = async () => {
    await FIModel.deleteMany({});
};

exports.createFI = async (data, token)=>{
    return await request(app).post('/fis').set('Authorization', "bearer "+token).send(data);
};

exports.getFI = async (id, token) => {
    return await request(app).get('/fis/'+ id).set('Authorization', "bearer "+token);
};

exports.getFIs = async token => {
    return await request(app).get('/fis').set('Authorization', "bearer "+token);
};

exports.updateFI = async (id, data, token)=>{
    return await request(app).put('/fis/'+id).set('Authorization', "bearer "+token).send(data);
};

exports.removeFI = async (id, token)=>{
    return await request(app).delete('/fis/'+id).set('Authorization', "bearer "+token)
};