//importing third-party modules
const mongoose =require('mongoose');
const expect = require('chai').expect;

//importing custom modules
const userTestConfig = require('./user-test-config');
const data = require('../../config/test-data');

describe("User-Controller Tests",()=>{
    const {name, emailNew, email, invalidEmail, password, shortPassword} = data;

    var token, id = "";

    beforeEach(async ()=>{
        userTestConfig.deleteAll();
        userInfo = await userTestConfig.setupUser();
        token = userInfo.token;
        id = userInfo.id;
    });

    describe('Users Retrieving Tests', () => {

        it('Should fail to retrieve users if requesting user role isn\'t ADMIN', async ()=>{
            userTestConfig.deleteAll();
            await userTestConfig.signUp({password, email});
            let response = await userTestConfig.signIn({password, email});
            id = response.body.data._id;
            token = response.body.data.token;
            response = await userTestConfig.getUsers(token);
            body = response.body;

            body = response.body;
            expect(response.status).to.equal(403);
            expect(body.status).to.equal(403);
            expect(body).to.have.property('type').to.equal('error');
            expect(body.errors).to.be.a('array');
            expect(body.errors.some(err => err.msg.includes("Not Authorized"))).to.be.true;
            expect(body.errors).to.have.lengthOf(1);

        });

        it('Should retrieve users if requesting user role is ADMIN', async () => {
            userTestConfig.deleteAll();
            await userTestConfig.signUp({name, password, email, role:"ADMIN"});
            let response = await userTestConfig.signIn({password, email});
            id = response.body.data._id;
            token = response.body.data.token;
            response = await userTestConfig.getUsers(token);
            body = response.body;

            body = response.body;
            expect(response.status).to.equal(200);
            expect(body).to.have.property('type').to.equal('success');
            expect(body.status).to.equal(200);
            expect(body.data).to.be.a('array');
            expect(body.data).to.have.lengthOf(1);
            expect(body.data[0]).to.have.property('email').equal(email);
        });

        it('Should retrieve a single saved user', async () => {
            let response = await userTestConfig.getUser(id, token);

            body = response.body;
            expect(response.status).to.equal(200);
            expect(body.type).to.equal("success");
            expect(body.status).to.equal(200);
            expect(body.data).to.be.a('array');
            expect(body.data).to.have.lengthOf(1);
            expect(body.data[0]).to.have.property('email').equal(email);
        });

        it('Should fail to retrieve a non existent user', async () => {
            let response = await userTestConfig.getUser(new mongoose.mongo.ObjectId(), token);

            body = response.body;
            expect(response.status).to.equal(404);
            expect(body).to.have.property('type').to.equal('error');
            expect(body.errors).to.be.a('array');
            expect(body.errors).to.have.lengthOf(1);
            expect(body.errors.some(err => err.msg.includes('user'))).to.be.true;
            expect(body).to.have.property('status').equal(404);
        });

    });

    describe('User removing tests',()=>{

        it('Should fail to remove any user when provided with an invalid user id', async ()=>{
            response = await userTestConfig.removeUser(new mongoose.mongo.ObjectId(), token);
            const body = response.body;

            expect(response.status).to.equal(404);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors).to.be.a.lengthOf(1);
            expect(body.errors.some(err => err.msg.includes('user'))).to.be.true;
            expect(body).to.have.property('status').equal(404);
        });

        it('Should remove a user when provided with valid user id', async ()=>{
            response = await userTestConfig.removeUser(id, token);
            body = response.body;

            expect(response.status).to.equal(200);
            expect(body.status).to.equal(200);
            expect(body.data).to.be.a('array');
            expect(body.type).to.equal('success');

            response = await userTestConfig.getUser(id, token);
            body = response.body;

            expect(response.status).to.equal(404);
            expect(body).to.have.property('type').to.equal('error');
            expect(body.errors).to.be.a('array');
            expect(body.errors).to.have.lengthOf(1);
            expect(body.errors.some(err => err.msg.includes('user'))).to.be.true;
            expect(body).to.have.property('status').equal(404);

        });

    });

    describe('User Update Tests', ()=>{

        it('Should fail to update email when provided with invalid email', async ()=>{
            response = await userTestConfig.updateUser(id, {email: invalidEmail}, token);
            const body = response.body;

            expect(response.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors).to.be.a.lengthOf(1);
            expect(body.errors.some(err => err.msg.includes('email'))).to.be.true;
            expect(body).to.have.property('status').equal(400);

        });

        it('Should update email when provided with valid email', async ()=>{
            response = await userTestConfig.updateUser(id, {email: emailNew}, token);

            body = response.body;
            expect(response.status).to.equal(200);
            expect(body.status).to.equal(200);
            expect(body.data).to.be.a('array');
            expect(body.type).to.equal('success');
            expect(body.data).to.have.lengthOf(1);
            expect(body.data[0]._id).to.equal(id);
            expect(body.data[0].email).to.equal(emailNew);
        });

        it('Should fail to update password when provided with invalid password', async ()=>{
            response = await userTestConfig.updateUser(id, {password: shortPassword}, token);
            const body = response.body;

            expect(response.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors).to.be.a.lengthOf(1);
            expect(body.errors.some(err => err.msg.includes('password'))).to.be.true;
            expect(body).to.have.property('status').equal(400);

        });

        it('Should update password when provided with valid email', async ()=>{
            response = await userTestConfig.updateUser(id, {email: emailNew}, token);

            body = response.body;
            expect(response.status).to.equal(200);
            expect(body.status).to.equal(200);
            expect(body.data).to.be.a('array');
            expect(body.type).to.equal('success');
            expect(body.data).to.have.lengthOf(1);
            expect(body.data[0]._id).to.equal(id);
            expect(body.data[0].email).to.equal(emailNew);
        });
    });

    afterEach(() => {
        return userTestConfig.deleteAll();
    });

});