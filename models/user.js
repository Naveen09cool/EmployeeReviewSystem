const mongoose = require('mongoose');
const Review = require('./review');

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
    assignedto:[{ //Employee that is to be
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    assignedfrom:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    }]
},{
        timestamps: true
});

//Telling mongoose that this is a model or collection
const User = mongoose.model('User',userSchema);

module.exports = User;