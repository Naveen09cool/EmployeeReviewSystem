const User = require('../models/user');

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
        }
    return res.redirect('back')            
    }
}

module.exports.adminView = async function(req, res){
    if(req.user.isAdmin == true){
        let users = await User.find({})
        return res.render('admin_home',{
            users: users
        })
    }else{
        console.log('Access Denied! Only admin Access');
    }    
}