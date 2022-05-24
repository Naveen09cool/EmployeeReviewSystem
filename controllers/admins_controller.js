const User = require('../models/user');

// get the List of Employees
module.exports.viewEmployee = async function(req, res){
    let users = await User.find({})
    console.log(`Emp Name i:${users}`);
    if(users.isAdmin == false){
        console.log(`Emp:${users}`);
        return res.render('admin_home', {
            title: "admin",
            employee: users
        })
    }
}

module.exports.removeEmployee = async function(req, res){
    if(req.users.isAdmin == true){
        let users = await User.findById(req.params.id);
        console.log(`Empsdas Name i:${users.name}`);
        users.remove();
        // return res.render('admin_home', {
        //     title: "admin",
        //     employee: users
        // })
        return res.redirect('admins/viewEmployee') 
    }

}

// Make Admin to Employee
module.exports.updateEmployee = async function(req, res){
    if(req.users.isAdmin == true){
        let emp = await User.findById(req.params.id);
        if(emp.isAdmin == false){
            emp.isAdmin = true
            emp.save()
        }
        return res.redirect('admins/adminView')            
    }
}

module.exports.adminView = async function(req, res){
    if(req.users.isAdmin == true){
        let users = await User.find({})
        return res.render('admin_home',{
            users: users
        })    
    }
}