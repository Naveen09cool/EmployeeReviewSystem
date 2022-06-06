const User = require('../models/user');
const Review = require('../models/review');

// Creating review
module.exports.setReview = async function(req, res){
    try {
        let receiver = await User.findById(req.params.id)
    for(let i = 0; i<receiver.assignedReview.length; i++){
        if(req.user){
            if(receiver.assignedReview[i] == req.user.id){
                const reviewDescription = await Review.create({
                    reviewTo : receiver.id,
                    reviewBy : req.user.id,
                    description: req.body.description
                })
                await reviewDescription.save()
                console.log("Review SAVED !");
                return res.redirect('back')
            }else{
                console.log("Not");
                // return res.redirect("back")
            }
        }else{
            console.log("Not a User!, Try logging in");
            return res.redirect("/users/sign-in")
        }
    }
    return res.redirect('back')
    } catch (error) {
        console.log('ERROR', error);
        return;
    }
    
}
