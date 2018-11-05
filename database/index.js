//import third-party modules
const mongoose = require('mongoose');

//import custom modules
const config   = require('../config');

exports.mongoose.connect = ()=>{
    //get a handle of the mongoose connection object
    const connection = mongoose.connection;

    //create a connection to mongoose database
    connection.connect(config.DB-URL);

    // event listener when connection is successful
    connection.on('connected',(conn)=> {
        console.log("mongoose database connection successful ;)");
    });

    // event listener for when connection fails
    connection.on('error',(err)=> {
        console.log("couldn't connect to mongoose database :(", err);
        process.exit(1);
    });
}