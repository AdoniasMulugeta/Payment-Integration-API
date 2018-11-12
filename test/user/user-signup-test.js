const expect = require('chai').expect;
const userTestConfig = require('./user-test-config');
const data = require('../../config/test-data');



describe('User Sign-Up Test', () => {
    const {name, email, invalidEmail, password, role} = data;

    beforeEach(() => userTestConfig.deleteAll());

    it('Should fail signup if name is missing', () => {
        return userTestConfig.signUp({email, password, role}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors.some(err => err.msg.includes('name'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should fail signup if email is missing', () => {
        return userTestConfig.signUp({name, password, role}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors).to.be.a.lengthOf(2);
            expect(body.errors.some(err => err.msg.includes('email'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should fail signup if email is not valid', () => {
        return userTestConfig.signUp({name, invalidEmail ,password, role}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors.some(err => err.msg.includes('email'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should fail signup if email already exists', () => {
        return userTestConfig.signUp({name, email ,password, role})
            .then(() => userTestConfig.signUp({name, email ,password, role}))
            .then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors).to.be.a.lengthOf(1);
            expect(body.errors.some(err => err.msg.includes('email'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should fail signup if password is missing', () => {
        return userTestConfig.signUp({name, email, role}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors).to.be.a.lengthOf(1);
            expect(body.errors.some(err => err.msg.includes('password'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should fail signup if role is missing', () => {
        return userTestConfig.signUp({name, password, email}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors).to.be.a.lengthOf(1);
            expect(body.errors.some(err => err.msg.includes('role'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should fail signup if name, email password and role are missing', () => {
        return userTestConfig.signUp({}).then(res => {
            const body = res.body;
            expect(res.status).to.equal(400);
            expect(body).to.be.a('object');
            expect(body).to.have.property('type').equal('error');
            expect(body.errors).to.be.an('array');
            expect(body.errors).to.be.a.lengthOf(5);
            expect(body.errors.some(err => err.msg.includes('name'))).to.be.true;
            expect(body.errors.some(err => err.msg.includes('email'))).to.be.true;
            expect(body.errors.some(err => err.msg.includes('password'))).to.be.true;
            expect(body.errors.some(err => err.msg.includes('role'))).to.be.true;
            expect(body).to.have.property('status').equal(400);
        });
    });
    it('Should signup successfully if all user input is valid', () => {
        return userTestConfig.signUp({name, password, email, role}).then(res => {
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