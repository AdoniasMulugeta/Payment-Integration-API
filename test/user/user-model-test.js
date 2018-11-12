//import third-party modules
const expect = require('chai').expect;

//import custom modules
const data   = require('../../config/test-data');
const userModel = require('../../app/user/user-model');

describe('User Model Tests',()=>{
    const {email, password} = data;

    it('Should fail validation if email is missing', done => {
        const user = new userModel({password});

        user.validate(err => {
            expect(err.errors.email).to.exist;
            done();
        })
    })

    it('Should fail validation if password is missing', done => {
        const user = new userModel({email});

        user.validate(err => {
            expect(err.errors.password).to.exist;
            done();
        })
    })

    it('Should fail validation if name and email are missing', done => {
        const user = new userModel({});

        user.validate(err => {
            expect(err.errors.email).to.exist;
            expect(err.errors.password).to.exist;
            done();
        })
    })
});