const User = require('../models/user');
const Review = require('../models/review');


module.exports.setReview = async function(req, res){
    let receiver = await User.findById(req.params.id)
    console.log(`sdahdiuahadasfiaisfiafnajbfdao; ${receiver.assignedReview.length}`);
    for(let i = 0; i<receiver.assignedReview.length; i++){
        if(req.user){
            if(receiver.assignedReview[i]== req.user.id){
                const reviewDescription = await Review.create({
                    reviewTo : receiver.id,
                    reviewBy : req.user.id,
                    description: req.query.description
                })
                reviewDescription.save()
                return res.redirect('back')
            }else{
                console.log("Not");
                return res.redirect("back")
            }
        }else{
            console.log("Not a User!, Try logging in");
            return res.redirect("/users/sign-in")
        }
    }

    return res.redirect('back')
    // let review = await Review.findById(req.body.id)
    // req.review.description = req.body.description;


}
