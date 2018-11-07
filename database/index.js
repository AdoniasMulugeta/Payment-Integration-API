//import third-party modules
const mongoose = require('mongoose');

//import custom modules
const CONFIG   = require('../config');

exports.connect = () => {

    //create a connection to mongoose database
    mongoose.connect(CONFIG.DB_URL, {useNewUrlParser: true});

    //get a handle of the mongoose connection object
    const connection = mongoose.connection;

    // event listener when connection is successful
    connection.on('connected',()=> {
        console.log("\nmongoose database connection successful ;)\n", CONFIG.DB_URL);
    });

    // event listener for when connection fails
    connection.on('error',(err)=> {
        console.log("couldn't connect to mongoose database :(", err);
        process.exit(1);
    });
}