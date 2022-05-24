const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    description:{
        type: String,
        required: true,
        unique: true
    },
    reviewTo:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    reviewBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
},{
        timestamps: true
});

//Telling mongoose that this is a model or collection
const Review = mongoose.model('Review',reviewSchema);

module.exports = Review;