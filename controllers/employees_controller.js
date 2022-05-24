const User = require('../models/user');
const Review = require('../models/review');


module.exports.listReviewTo = async function(req, res){
    let assignedTo = await User.findById(req.body._id)
    for(let i = 0; i<User.assignedEmp.length; i++){
        if(req.body._id == User.assignedEmp[i]){
            return res.render(this.listReviewTo);
        }
    }
}

module.exports.giveReviewTo = async function(req, res){
    
}