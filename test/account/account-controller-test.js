//importing third-party modules
const mongoose =require('mongoose');
const expect = require('chai').expect;

//importing custom modules
const accountTestConfig = require('./account-test-config');
const userTestConfig = require('../user/user-test-config');
const FITestConfig = require('../FI/FI-test-config');

const data = require('../../config/test-data');
//todo finish writing account controller tests
describe("Account Controller Tests", ()=>{
   var client_id, fi_id, token;
   beforeEach(async ()=>{
      await accountTestConfig.deleteAll();
      ({client_id, fi_id, token} = await accountTestConfig.setupAccount({}));
   });

   describe("Account Creating Tests", ()=>{
       it('should fail to create an account when fi_id is missing', async ()=> {
            let response = await accountTestConfig.createAccount(client_id, {client_id}, token);
            body = response.body;

           expect(response.status).to.equal(400);
           expect(body.status).to.equal(400);
           expect(body).to.have.property('type').to.equal('error');
           expect(body.errors).to.be.a('array');
           expect(body.errors.some(err => err.msg.includes("financial institution ID"))).to.be.true;
       });

       it('should successfully create an account when fi_id and user_id are provided', async()=> {
           let response = await accountTestConfig.createAccount(client_id, {fi_id}, token);
           body = response.body;

           expect(response.status).to.equal(200);
           expect(body).to.have.property('type').to.equal('success');
           expect(body).to.have.property('collection').to.equal('Accounts');
           expect(body.status).to.equal(200);
           expect(body.data).to.be.a('array');
           expect(body.data).to.have.lengthOf(1);
           expect(body.data[0]).to.have.property('fi_id').equal(fi_id);
           expect(body.data[0]).to.have.property('client_id').equal(client_id);
       });
   });

   describe("Account Retrieving Tests",()=>{
       describe("All Accounts Retrieving Tests",()=>{
           beforeEach(async()=>{
               const response = await accountTestConfig.createAccount(client_id, {fi_id}, token);
               id = response.body.data._id;
               expect(response.status).to.equal(200);
           });
           it('should fail to retrieve accounts when client_id is invalid', async ()=> {
              let response = await accountTestConfig.getAccounts(new mongoose.mongo.ObjectId(), token);
              body = response.body;

              expect(response.status).to.equal(404);
              expect(body.status).to.equal(404);
              expect(body).to.have.property('type').to.equal('error');
              expect(body.errors).to.be.a('array');
              expect(body.errors.some(err => err.msg.includes("user not found"))).to.be.true;
          });

           it('should successfully retrieve accounts', async ()=> {
               let response = await accountTestConfig.getAccounts(client_id, token);
               body = response.body;

               expect(response.status).to.equal(200);
               expect(body).to.have.property('type').to.equal('success');
               expect(body).to.have.property('collection').to.equal('Accounts');
               expect(body.status).to.equal(200);
               expect(body.data).to.be.a('array');
               expect(body.data).to.have.lengthOf(1);
               expect(body.data[0]).to.have.property('fi_id').equal(fi_id);
               expect(body.data[0]).to.have.property('client_id').equal(client_id);
           });

           it('should retrieve only account owner\'s accounts', async ()=> {
               const uid_1 = client_id;
               const fid_1 = fi_id;
               const token_1 =token;

               ({client_id, fi_id, token} = await accountTestConfig.mSetupAccount({
                   email:"johndoe@gmail.com",
                   password:"admin1234",
                   role:"ADMIN",
                   FIName: "Mbirr"
               }));
               response = await accountTestConfig.createAccount(client_id, {fi_id}, token);
               expect(response.status).to.equal(200);
               const uid_2 = client_id;
               const fid_2 = fi_id;
               const token_2 =token;

               response = await accountTestConfig.getAccounts(client_id, token);
               body = response.body;

               expect(response.status).to.equal(200);
               expect(body).to.have.property('type').to.equal('success');
               expect(body).to.have.property('collection').to.equal('Accounts');
               expect(body.status).to.equal(200);
               expect(body.data).to.be.a('array');
               expect(body.data).to.have.lengthOf(1);
               expect(body.data[0]).to.have.property('fi_id').equal(fi_id);
               expect(body.data[0]).to.have.property('client_id').equal(client_id);
           });
      });

       describe("Account Retrieving by id Tests",()=>{
            it('should fail to retrieve accounts when client_id is invalid', async ()=> {
              let response = await accountTestConfig.getAccount(new mongoose.mongo.ObjectId(), token);
              body = response.body;

              expect(response.status).to.equal(404);
              expect(body.status).to.equal(404);
              expect(body).to.have.property('type').to.equal('error');
              expect(body.errors).to.be.a('array');
              expect(body.errors.some(err => err.msg.includes("user not found"))).to.be.true;
          });

            it('should successfully retrieve accounts', async ()=> {
               await accountTestConfig.createAccount(client_id, {fi_id}, token);
               let response = await accountTestConfig.getAccounts(client_id, token);
               body = response.body;

               expect(response.status).to.equal(200);
               expect(body).to.have.property('type').to.equal('success');
               expect(body).to.have.property('collection').to.equal('Accounts');
               expect(body.status).to.equal(200);
               expect(body.data).to.be.a('array');
               expect(body.data).to.have.lengthOf(1);
               expect(body.data[0]).to.have.property('fi_id').equal(fi_id);
               expect(body.data[0]).to.have.property('client_id').equal(client_id);
            });

            it('should retrieve only account owner\'s accounts', async ()=> {
                let response = await accountTestConfig.createAccount(client_id, {fi_id}, token);
                expect(response.status).to.equal(200);
                const uid_1 = client_id;
                const fid_1 = fi_id;
                const token_1 =token;

                ({client_id, fi_id, token} = await accountTestConfig.mSetupAccount({
                   email:"johndoe@gmail.com",
                   password:"admin1234",
                   role:"ADMIN",
                   FIName: "Mbirr"
                }));
                response = await accountTestConfig.createAccount(client_id, {fi_id}, token);
                expect(response.status).to.equal(200);
                const uid_2 = client_id;
                const fid_2 = fi_id;
                const token_2 =token;

                response = await accountTestConfig.getAccounts(client_id, token);
                body = response.body;

                expect(response.status).to.equal(200);
                expect(body).to.have.property('type').to.equal('success');
                expect(body).to.have.property('collection').to.equal('Accounts');
                expect(body.status).to.equal(200);
                expect(body.data).to.be.a('array');
                expect(body.data).to.have.lengthOf(1);
                expect(body.data[0]).to.have.property('fi_id').equal(fi_id);
                expect(body.data[0]).to.have.property('client_id').equal(client_id);
            });
      });
   });

   describe("Account Updating Tests",()=>{
       let id = ''
       beforeEach(async ()=>{
           response = await accountTestConfig.createAccount(client_id, {fi_id}, token);
           id = response.body.data._id
       });
       it('should fail to update an account when new fi_id is non existent', async ()=> {
           let response = await accountTestConfig.updateAccount(id, client_id, {client_id}, token);
           body = response.body;

           expect(response.status).to.equal(400);
           expect(body.status).to.equal(400);
           expect(body).to.have.property('type').to.equal('error');
           expect(body.errors).to.be.a('array');
           expect(body.errors.some(err => err.msg.includes("financial institution ID"))).to.be.true;
       });

       it('should successfully update an account when valid data is provided', async()=> {
           let response = await accountTestConfig.updateAccount(client_id, {client_id}, token);
           body = response.body;

           expect(response.status).to.equal(200);
           expect(body).to.have.property('type').to.equal('success');
           expect(body).to.have.property('collection').to.equal('Accounts');
           expect(body.status).to.equal(200);
           expect(body.data).to.be.a('array');
           expect(body.data).to.have.lengthOf(1);
           expect(body.data[0]).to.have.property('fi_id').equal(fi_id);
           expect(body.data[0]).to.have.property('client_id').equal(client_id);
       });
   });

   describe("Account Removing Tests",()=>{

   });

   it('should fail to create a new account if "account name" is missing',  () => {

   });
   afterEach(()=>{
      accountTestConfig.deleteAll();
   });
});

