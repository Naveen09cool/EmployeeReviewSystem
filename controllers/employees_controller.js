const User = require('../models/user');
const Review = require('../models/review');


// module.exports.listReviewTo = async function(req, res){
//     let assignedTo = await User.findById(req.body._id)
//     for(let i = 0; i<User.assignedEmp.length; i++){
//         if(req.body._id == User.assignedEmp[i]){
//             return res.render(this.listReviewTo);
//         }
//     }
// }
// module.exports.giveReviewTo = async function(req, res){
// }

module.exports.empView = async function(req, res){
    if(req.user.isAdmin == false){
        let users = await User.find({}).populate( 'assignedto assignedReview')
        let reviews = await Review.find({review: req.user.id})
        let reviewDescription = []
        for(let i = 0; i<reviews.length; i++){
        let temp = []
            // console.log("request dcsdcsd   =>"+ req.user.assignedto[i])
            // console.log("request dcsdcsd   =>"+ reviews[i].reviewTo)
            // console.log("request dcsdcsd   =>"+ reviews[i].reviewBy)
            // console.log("request dcsdcsd   =>"+ req.user.id)

            if(reviews[i].reviewBy == req.user.id || reviews[i].reviewTo == req.user.assignedto[i]){
                temp.push(await reviews[i].description)
                console.log("TEMP   =>"+ temp);    
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
    }    
}
