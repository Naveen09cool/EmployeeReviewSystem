const User = require('../models/user');
const Review = require('../models/review');

// Employee Home view
module.exports.empView = async function(req, res){
    if(req.user.isAdmin == false){
        let users = await User.find({}).populate( 'assignedto assignedReview')
        let reviews = await Review.find({review: req.user.id})
        let reviewDescription = []
        for(let i = 0; i<reviews.length; i++){
            let temp = []
            if(reviews[i].reviewBy == req.user.id || reviews[i].reviewTo == req.user.assignedto[i]){
                temp.push(await reviews[i].description)
            }
            reviewDescription.push(temp)
        }
        return res.render('emp_home',{
            users: users,
            reviews: reviews,
            reviewDescription: reviewDescription
        })
    }else{
        console.log('Access Denied');
        return res.redirect('back')
    }    
}
