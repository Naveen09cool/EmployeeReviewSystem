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

module.exports.empView = async function(req, res){
    if(req.user.isAdmin == false){
        let users = await User.find({})
        let reviews = await Review.find({})
        console.log("cdscsdcsdcdscsdcsdcsdcsdcsdcsd   =>"+ reviews);
        return res.render('emp_home',{
            users: users,
            reviews:reviews,
        })
    }else{
        console.log('Access Denied');
    }    
}
