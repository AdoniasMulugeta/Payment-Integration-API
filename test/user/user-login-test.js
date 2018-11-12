const expect = require('chai').expect;
const userTestConfig = require('./user-test-config');
const data = require('../../config/test-data');

describe("User Login Test", ()=>{
    const {name, fakeName, email, invalidEmail, fakeEmail, password, fakePassword, role} = data;
    beforeEach(() => {
        return userTestConfig.deleteAll();
    });
    it("Should Fail to Login if email is not provided",async ()=>{
        response = await userTestConfig.logIn({password});
        body = response.body;
        expect(response.status).to.equal(400)
        expect(body).to.be.a('object');
        expect(body).to.have.property('type').equal('error');
        expect(body.errors).to.be.an('array');
        expect(body.errors).to.be.a.lengthOf(2);
        expect(body.errors[0].msg).contains('email');
        expect(body).to.have.property('status').equal(400);
    });
    it("Should Fail to Login if password is not provided",async ()=>{
        response = await userTestConfig.logIn({email});
        body = response.body;
        expect(response.status).to.equal(400)
        expect(body).to.be.a('object');
        expect(body).to.have.property('type').equal('error');
        expect(body.errors).to.be.an('array');
        expect(body.errors).to.be.a.lengthOf(1);
        expect(body.errors.some(err => err.msg.includes('password'))).to.be.true;
        expect(body).to.have.property('status').equal(400);
    });
    it("Should Fail to Login if both email and  password are not provided",async ()=>{
        response = await userTestConfig.logIn({});
        body = response.body;
        expect(response.status).to.equal(400)
        expect(body).to.be.a('object');
        expect(body).to.have.property('type').equal('error');
        expect(body.errors).to.be.an('array');
        expect(body.errors).to.be.a.lengthOf(3);
        expect(body.errors.some(err => err.msg.includes('password'))).to.be.true;
        expect(body.errors.some(err => err.msg.includes('email'))).to.be.true;
        expect(body).to.have.property('status').equal(400);
    });
    describe('User Login with Wrong Credentials Test',()=>{
        beforeEach(async () => {
            await userTestConfig.deleteAll();
            response = await userTestConfig.signUp({name, email, password, role});
            expect(response.status).to.equal(201);
        });
        it('should fail to login if email does not exist', async () => {
            response = await userTestConfig.logIn({email : fakeEmail, password})
            const body = response.body;
            expect(response.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors).to.be.a.lengthOf(1);
            expect(body.errors.some(err => err.msg.includes('Authentication'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
        it('should fail to login if password is incorrect', async () => {
            response = await userTestConfig.logIn({email, password: fakePassword})
            const body = response.body;
            expect(response.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors).to.be.a.lengthOf(1);
            expect(body.errors.some(err => err.msg.includes('Authentication'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
        it('Should login if username and password are correct', async () => {
            response = await userTestConfig.logIn({email, password})
            const body = response.body;
            expect(response.status).to.equal(200);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('Success');
            expect(body.data).to.be.an('object');
            expect(body.data).to.have.property('_id');
            expect(body.data).to.have.property('email').to.be.equal(email);
            expect(body.data).to.have.property('role').to.be.equal(role);
            expect(body.data).to.have.property('token');
            expect(body).to.have.property('status').equal(200);
        });
    })
})