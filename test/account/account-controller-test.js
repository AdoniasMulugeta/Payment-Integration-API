//importing third-party modules
const mongoose =require('mongoose');
const expect = require('chai').expect;

//importing custom modules
const accountTestConfig = require('./account-test-config');

const data = require('../../config/test-data');
//todo finish writing account controller tests
describe("Account Controller Tests", ()=>{
   const {name, email, password, role} = data;
   beforeEach(async ()=>{
       await accountTestConfig.deleteAll();


   });
   it('should fail to create a new account if "account name" is missing',  () => {

   });
});

