const User = require('../models/user');
const Review = require('../models/review');

// Employee Home view
module.exports.empView = async function(req, res){
    if(req.user.isAdmin == false){
        let oneUser = await User.findById(req.user.id).populate('assignedto')
        // let reviewsBy = await Review.find({reviewBy:req.user.id})
        // console.log(reviewsBy[0].description);
        let reviewDescription = []
        for(let i = 0; i<oneUser.assignedto.length; i++){
            reviewDescription.push(await Review.find({reviewTo:oneUser.assignedto[i].id , reviewBy:req.user.id}))
        }
        return res.render('emp_home',{
                oneUser: oneUser,
                // reviews: reviewsBy,
                reviewDescription: reviewDescription
            })
    }else{
        console.log('Access Denied');
        return res.redirect('back')
    }    
}