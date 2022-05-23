const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    assignedEmp:[]
},{
        timestamps: true
});

//Telling mongoose that this is a model or collection
const User = mongoose.model('User',userSchema);

module.exports = User;