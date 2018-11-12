//importing third-party modules
const mongoose =require('mongoose');
const expect = require('chai').expect;

//importing custom modules
const userTestConfig = require('./user-test-config');
const data = require('../../config/test-data');

describe("User-Controller Tests",()=>{
    const {name, emailNew, email, invalidEmail, fakeEmail, password, fakePassword, role} = data;
    beforeEach(() => {
        return userTestConfig.deleteAll();
    });

    it('Should retrieve an empty list of users', async () => {
        const response = await userTestConfig.getUsers();
        body = response.body;
        expect(response.status).to.equal(200);
        expect(body.status).to.equal(200);
        expect(body.data).to.be.a('array');
        expect(body.type).to.equal('success');
        expect(body.data).to.have.lengthOf(0);
    });
    describe('Retrieving Saved Users Test', () => {
        beforeEach(() => {
            return userTestConfig.deleteAll();
        });

        it('Should retrieve a list of saved users', async () => {
            await userTestConfig.signUp({name, email, password, role});
            const response = await userTestConfig.getUsers();

            body = response.body;
            expect(response.status).to.equal(200);
            expect(body.status).to.equal(200);
            expect(body.data).to.be.a('array');
            expect(body.data).to.have.lengthOf(1);
            expect(body.data[0]).to.have.property('name').equal(name);
            expect(body.data[0]).to.have.property('email').equal(email);
        });

        it('Should retrieve a single saved user', async () => {
            let response = await userTestConfig.signUp({name, email, password, role});
            response = await userTestConfig.getUser(response.body.data._id);

            body = response.body;
            expect(response.status).to.equal(200);
            expect(body.status).to.equal(200);
            expect(body.data).to.be.a('array');
            expect(body.data).to.have.lengthOf(1);
            expect(body.data[0]).to.have.property('name').equal(name);
            expect(body.data[0]).to.have.property('email').equal(email);
        });

        it('Should fail to retrieve an invalid user', async () => {
            await userTestConfig.signUp({name, email, password, role});
            response = await userTestConfig.getUser(new mongoose.mongo.ObjectId());

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


    // it('Should update email with the new information provided', async ()=>{
    //     await userTestConfig.signUp({name, password, email, role});
    //     let response = await userTestConfig.logIn({password, email});
    //     const id = response.body.data._id;
    //     const token = response.body.data.token;
    //     response = await userTestConfig.updateUser(token ,id, {email: emailNew});
    //
    //     body = response.body;
    //     expect(response.status).to.equal(200);
    //     expect(body.status).to.equal(200);
    //     expect(body.data).to.be.a('array');
    //     expect(body.type).to.equal('success');
    //     expect(body.data).to.have.lengthOf(1);
    //     expect(body.data[0]._id).to.equal(id);
    //     expect(body.data[0].email).to.equal(emailNew);
    // });
    afterEach(() => {
        return userTestConfig.deleteAll();
    });
});