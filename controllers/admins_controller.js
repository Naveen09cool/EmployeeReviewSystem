const User = require('../models/user');
const Review = require('../models/review');


// get the List of Employees
module.exports.viewEmployees = async function(req, res){
    if(req.user.isAdmin == true){
        let users = await User.find({})
        let empArray = [];
        for(let i = 0; i<users.length; i++){
            if(users[i].isAdmin == false){
                empArray.push(users)
            }
        }
        return res.render('admin_home',{
            empArray: empArray
        });
    }else{
        console.log("Access denied! Only Admin Access");
        return res.redirect('/users/sign-in') 
    }
}

// delete user
module.exports.removeEmployee = async function(req, res){
    if(req.user.isAdmin == true){
        let users = await User.findById(req.params.id);
        let allUser = await User.find({});
        let reviews = await Review.find({});
            for(let i = 0; i < reviews.length; i++){
                if(reviews[i].reviewBy == req.params.id){
                    await reviews[i].remove()
                    console.log(`Deleted Review`);
                }
                if(reviews[i].reviewTo == req.params.id){
                    await reviews[i].remove()
                    console.log(`Deleted Review`);
                }
            }                                                                              
            for(let i = 0; i < allUser.length; i++){
                let tempObject = allUser[i];
                let tempId = users.id;
                await User.updateOne({_id:tempObject},{$pullAll: {
                    assignedReview: [users.id]} 
                });
                await User.updateOne({_id:tempObject},{$pullAll: {
                    assignedto: [tempId]}
                });
            }
            await users.remove();
            console.log(`Deleted User:${users.name}`);                                                          
            return res.redirect('back') 
    }else{
        console.log("Access denied! Only Admin can remove user");
        return res.redirect('back') 
    }

}

// Make Admin to Employee
module.exports.updateEmployee = async function(req, res){
    if(req.user.isAdmin == true){
        let emp = await User.findById(req.params.id);
        if(emp.isAdmin == false){
            emp.isAdmin = true
            emp.save()
        }else{
            emp.isAdmin = false
            emp.save()
        }
    return res.redirect('back')            
    }else{
        console.log("Access denied! Only Admin can Update user");
        return res.redirect('back')
    }
}

// Admin home page
module.exports.adminView = async function(req, res){
    if(req.user.isAdmin == true){
        let thisUser =  req.user
        let users = await User.find({})
        .populate( 'assignedReview assignedto' )
        let allUser = []
        for(let each_user of users){
            let allReview= []
            allReview.push(each_user)
            let reviews = await Review.find({reviewBy:each_user._id})
            for(let each_review of reviews){
                allReview.push(each_review)
            }
            allUser.push(allReview)
        }
        return res.render('admin_home',{
            users: allUser,
            user:users,
            thisUser: thisUser
        })
    }else{
        console.log('Access Denied! Only admin Access');
        return res.redirect('/users/sign-in') 
    }    
}

// Assign Review
module.exports.assignReview = async function(req, res){
    if(req.user.isAdmin == true){
        let reviewer = await User.findById(req.body.userX);
        let receiver = await User.findById(req.body.userY);
        if(reviewer == receiver || receiver.isAdmin == true || reviewer.isAdmin == true){
            console.log(`Try Again! Review can't be Assigned to same user or admin`);
            return res.redirect('back')
        }
        await reviewer.assignedto.push(receiver)
        reviewer.save()
        await receiver.assignedReview.push(reviewer)
        receiver.save()
        console.log(`Success! Review Assigned to:${reviewer.name}`);
        return res.redirect('back')
    }else{
        console.log('Access Denied! Only admin Access');
        return res.redirect('back')
    }  
}
