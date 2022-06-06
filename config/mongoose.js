// require the library
const mongoose = require('mongoose');

require('dotenv').config();

// connecting database
mongoose.connect(process.env.MONGO_CONNECT);

// aquire the connection
const db = mongoose.connection;

//on error
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

// on success
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

// exporting db
module.exports = db;