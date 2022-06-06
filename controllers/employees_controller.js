const User = require('../models/user');
const Review = require('../models/review');

// Employee Home view
module.exports.empView = async function(req, res){
    try {
        if(req.user.isAdmin == false){
            let oneUser = await User.findById(req.user.id).populate('assignedto')
            let reviewDescription = []
            for(let i = 0; i<oneUser.assignedto.length; i++){
                reviewDescription.push(await Review.find({reviewTo:oneUser.assignedto[i].id , reviewBy:req.user.id}))
            }
            return res.render('emp_home',{
                    oneUser: oneUser,
                    reviewDescription: reviewDescription
                })
        }else{
            console.log('Access Denied');
            return res.redirect('back')
        }
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }
        
}