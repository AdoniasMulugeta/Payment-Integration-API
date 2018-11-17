//importing third-party modules
const expect = require('chai').expect;

//importing custom modules
const userTestConfig = require('./user-test-config');
const data = require('../../config/test-data');

describe("User-Validation Tests",async ()=>{
    const {name, email, invalidEmail, password, role} = data;

    beforeEach(async () => {
        return userTestConfig.deleteAll();
        await userTestConfig.signUp({name, email, password, role});
    });

    it('Should fail to update user if name is empty', async () => {
        let response  = await userTestConfig.logIn({email, password});
        var user = response.body.data;
        response = await userTestConfig.updateUser(user.token, user._id, {name: ""});
        const body = response.body;
        expect(response.status).to.equal(400);
        expect(body.status).to.equal(400);
        expect(body).to.have.property('type').equal('error');
        expect(body.errors).to.be.an('array');
        expect(body.errors).to.be.a.lengthOf(1);
        expect(body.errors[0].msg).contains('name');
    });

    it('Should fail to update name if name is > 50 characters', async () => {
        let response  = await userTestConfig.logIn({email, password});
        const user =response.body.data;
        let longStr = '';
        for(i=0;i<55;i++){longStr+='a'}
        response = await userTestConfig.updateUser(user.token, user._id, {name: longStr});
        const body = response.body;
        expect(response.status).to.equal(400);
        expect(body.status).to.equal(400);
        expect(body).to.have.property('type').equal('error');
        expect(body.errors).to.be.an('array');
        expect(body.errors).to.be.a.lengthOf(1);
        expect(body.errors[0].msg).contains('name');
        expect(body.errors[0].msg).contains('50');
    });

    it('Should fail to update user if email is empty', async () => {
        let response  = await userTestConfig.logIn({email, password});
        const user =response.body.data;
        response = await userTestConfig.updateUser(user.token, user._id, {email: ""});
        const body = response.body;
        expect(response.status).to.equal(400);
        expect(body.status).to.equal(400);
        expect(body).to.have.property('type').equal('error');
        expect(body.errors).to.be.an('array');
        expect(body.errors).to.be.a.lengthOf(1);
        expect(body.errors[0].msg).contains('email');
    });

    it('Should fail to update user if email is not valid', async () => {
        let response  = await userTestConfig.logIn({email, password});
        const user =response.body.data;
        response = await userTestConfig.updateUser(user.token, user._id, {email: invalidEmail});
        const body = response.body;
        expect(response.status).to.equal(400);
        expect(body.status).to.equal(400);
        expect(body).to.have.property('type').equal('error');
        expect(body.errors).to.be.an('array');
        expect(body.errors).to.be.a.lengthOf(1);
        expect(body.errors[0].msg).contains('email');
    });
});