const User = require('../models/user');

// get the sign up data
module.exports.create = function(req, res){
    try {
        if(req.body.password != req.body.confirm_password){
            return res.redirect('back');
        }
    
        User.findOne({email: req.body.email}, function(err, user){
            
            if(err){console.log('Error in finding user');return}
    
            if(!user){
                User.create(req.body, function(err, user){
                    if(err){
                        console.log('Error in creating user');
                        return
                    }
                    return res.redirect('/users/sign-in');
                })
            }else{
                console.log('Created!!')
                return res.redirect('back');
            }
        })
    } catch (error) {
        console.log('ERROR', error);
        return;
    }
    
}

// render the sign up page
module.exports.signUp = function(req, res){
    try {
        return res.render('user_signup',{
            title: "Sign up"
        })
    } catch (error) {
        console.log('ERROR', error);
        return;
    }
    
}

// render the sign in page
module.exports.signIn = function(req, res){
    try {
        return res.render('user_sign_in', {
            title: "Sign In"
        })
    } catch (error) {
        console.log('ERROR', error);
        return;
    }    
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    try{
        if(req.user.isAdmin == true){
            return res.redirect('/admins/admin-view') 
        }
        return res.redirect('/employees/emp-view');
    }catch(err){
        console.log('ERROR', err);
        return;
    }
}

module.exports.destroySession = function(req, res){
    try {
            req.logout(function(err) {
                if (err) { 
                    return (err);
            }
            res.redirect('/');
        })
    } catch (err) {
        console.log('ERROR destroying Session', err);
        return;
    }
}

