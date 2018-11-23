//importing third-party modules
const mongoose =require('mongoose');
const expect = require('chai').expect;

//importing custom modules
const FITestConfig = require('./fi-test-config');
const userTestConfig = require('../user/user-test-config');
const data = require('../../config/test-data');

describe("FI controller Tests",()=>{
    const {name, email, password} = data;

    beforeEach(async ()=>{
        FITestConfig.deleteAll();
        userTestConfig.deleteAll();
        ({id,token} = await userTestConfig.setupUser());
    });

    describe('FI Creating Tests', () => {

        it('Should fail to retrieve FIs if requesting user role is not ADMIN', async ()=>{

            let response = await FITestConfig.getFIs(token);
            body = response.body;

            body = response.body;
            expect(response.status).to.equal(403);
            expect(body.status).to.equal(403);
            expect(body).to.have.property('type').to.equal('error');
            expect(body.errors).to.be.a('array');
            expect(body.errors.some(err => err.msg.includes("Not Authorized"))).to.be.true;
            expect(body.errors).to.have.lengthOf(1);
        });

        it('Should retrieve FIs if requesting user role is ADMIN', async () => {
            userTestConfig.deleteAll();
            ({id,token} = await userTestConfig.setupUser('ADMIN'));
            const FIID = await FITestConfig.setupFI();
            let response = await FITestConfig.getFIs(token);
            body = response.body;

            expect(response.status).to.equal(200);
            expect(body).to.have.property('type').to.equal('success');
            expect(body.status).to.equal(200);
            expect(body.data).to.be.a('array');
            expect(body.data).to.have.lengthOf(1);
            expect(body.data[0]).to.have.property('_id').equal(FIID);
        });

    });

    describe('FI Retrieving Tests', () => {

        it('Should fail to retrieve FIs if requesting user role is not ADMIN', async ()=>{

            let response = await FITestConfig.getFIs(token);
            body = response.body;

            body = response.body;
            expect(response.status).to.equal(403);
            expect(body.status).to.equal(403);
            expect(body).to.have.property('type').to.equal('error');
            expect(body.errors).to.be.a('array');
            expect(body.errors.some(err => err.msg.includes("Not Authorized"))).to.be.true;
            expect(body.errors).to.have.lengthOf(1);
        });

        it('Should retrieve FIs if requesting user role is ADMIN', async () => {
            userTestConfig.deleteAll();
            ({id,token} = await userTestConfig.setupUser('ADMIN'));
            const FIID = await FITestConfig.setupFI();
            let response = await FITestConfig.getFIs(token);
            body = response.body;

            expect(response.status).to.equal(200);
            expect(body).to.have.property('type').to.equal('success');
            expect(body.status).to.equal(200);
            expect(body.data).to.be.a('array');
            expect(body.data).to.have.lengthOf(1);
            expect(body.data[0]).to.have.property('_id').equal(FIID);
        });

    });

    describe('FI updating Tests', async () => {

    });

    describe('FI removing Tests', () => {

    });

    afterEach(async ()=>{
        FITestConfig.deleteAll();
        userTestConfig.deleteAll();
    });
});