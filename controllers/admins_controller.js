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
    }
}

// deleted user
module.exports.removeEmployee = async function(req, res){
    if(req.user.isAdmin == true){
    let users = await User.findById(req.params.id);
        console.log(`Deleted User:${users.name}`);
        users.remove();
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
    }
}

module.exports.adminView = async function(req, res){
    if(req.user.isAdmin == true){
        let users = await User.find({})
        let reviews = await User.find({})
        return res.render('admin_home',{
            users: users,
            reviews:reviews
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
        await reviewer.assignedto.push(receiver)
        reviewer.save()
        await receiver.assignedReview.push(reviewer)
        receiver.save()
        console.log(`Review Assigned to:${reviewer.name}`);
        return res.redirect('back')
    }else{
        console.log('Access Denied! Only admin Access');
    }  
}