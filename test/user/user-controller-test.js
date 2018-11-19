//importing third-party modules
const mongoose =require('mongoose');
const expect = require('chai').expect;

//importing custom modules
const userTestConfig = require('./user-test-config');
const data = require('../../config/test-data');

describe("User-Controller Tests",()=>{
    const {name, emailNew, email, invalidEmail, fakeEmail, password, fakePassword, role} = data;
    var token, id = "";
    beforeEach(async ()=>{
        userTestConfig.deleteAll();
        userInfo = await userTestConfig.setupUser();
        token = userInfo.token;
        id = userInfo.id;
    });

    describe('Users Retrieving Tests', () => {

        it('Should fail to retrieve a user without the appropriate user role', async ()=>{
            userTestConfig.deleteAll();
            await userTestConfig.signUp({name, password, email, role});
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

        it('Should retrieve a list of saved users', async () => {
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
            expect(body.data[0]).to.have.property('name').equal(name);
            expect(body.data[0]).to.have.property('email').equal(email);
        });

        it('Should retrieve a single saved user', async () => {
            response = await userTestConfig.getUser(id, token);

            body = response.body;
            expect(response.status).to.equal(200);
            expect(body.type).to.equal("success");
            expect(body.status).to.equal(200);
            expect(body.data).to.be.a('array');
            expect(body.data).to.have.lengthOf(1);
            expect(body.data[0]).to.have.property('name').equal(name);
            expect(body.data[0]).to.have.property('email').equal(email);
        });

        it('Should fail to retrieve a non existent user', async () => {
            response = await userTestConfig.getUser(new mongoose.mongo.ObjectId(), token);

            body = response.body;
            expect(response.status).to.equal(404);
            expect(body).to.have.property('type').to.equal('error');
            expect(body.errors).to.be.a('array');
            expect(body.errors).to.have.lengthOf(1);
            expect(body.errors.some(err => err.msg.includes('user'))).to.be.true;
            expect(body.errors.some(err => err.msg.includes("doesn't exist"))).to.be.true;
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

        it('Should update email with the new information provided', async ()=>{
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