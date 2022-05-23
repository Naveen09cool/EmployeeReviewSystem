const User = require('../models/user');


module.exports.home = async function(req, res){
    try{
        // Note: Populate is a special function, which is being used for targeting the whole posts      
        // let users = await User.find({});
        
        console.log(req.body);
        // return res.render('home',{
        //     title: 'Home',
        //     // all_users: users
        // });

        if(req.user.isAdmin == true){
            return res.render('admin_home');
        }
        return res.render('emp_home');

    }catch(err){
        console.log('ERROR', err);
        return;
    }
}