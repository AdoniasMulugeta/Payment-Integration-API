const expect = require('chai').expect;
const userTestConfig = require('./user-test-config');
const data = require('../../config/test-data');



describe('User Sign-Up Test', () => {
    const {email, invalidEmail, password, shortPassword} = data;

    beforeEach(() => userTestConfig.deleteAll());

    it('Should fail signup if email is missing', () => {
        return userTestConfig.signUp({password}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors.some(err => err.msg.includes('email'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should fail signup if email is not valid', () => {
        return userTestConfig.signUp({invalidEmail ,password}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors.some(err => err.msg.includes('email'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should fail signup if email already exists', async () => {
        await userTestConfig.signUp({email ,password});
        const response = await userTestConfig.signUp({email ,password});
        const body = response.body;
        expect(response.status).to.equal(400);
        expect(body).to.be.a('object');
        expect(body).to.have.property('type').equal('error');
        expect(body.errors).to.be.an('array');
        expect(body.errors).to.be.a.lengthOf(1);
        expect(body.errors.some(err => err.msg.includes('email'))).to.be.true;
        expect(body).to.have.property('status').equal(400);
    });
    it('Should fail signup if password is missing', () => {
        return userTestConfig.signUp({email}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors.some(err => err.msg.includes('password'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should fail signup if password is empty string', () => {
        return userTestConfig.signUp({email, password: ''}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors.some(err => err.msg.includes('password'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should fail signup if password length is < 6', () => {
        return userTestConfig.signUp({email, password : shortPassword}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors.some(err => err.msg.includes('password'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should fail signup if email and password are missing', () => {
        return userTestConfig.signUp({}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors.some(err => err.msg.includes('email'))).to.be.true;
            expect(body.errors.some(err => err.msg.includes('password'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should signup if email and password are valid', () => {
        return userTestConfig.signUp({password, email}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(201);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('success');
            expect(body).to.have.property('status').equal(201);
        });
    });
    afterEach(() => {
        return userTestConfig.deleteAll();
    });
});