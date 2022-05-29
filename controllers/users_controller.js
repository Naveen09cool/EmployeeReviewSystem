const User = require('../models/user');

// get the sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        
        if(err){console.log('Error in finding user');return}

        if(!user){
            User.create(req.body, function(err, user){
                if(err){console.log('Error in creating user');return}
                return res.redirect('/users/sign-in');
            })
        }else{
            console.log('Created!!')
            return res.redirect('back');
        }
    })
}

// render the sign up page
module.exports.signUp = function(req, res){

    return res.render('user_signup',{
        title: "Sign up"
    })
}

// render the sign in page
module.exports.signIn = function(req, res){

    // if (req.isAuthenticated()){
    //     return res.redirect('/');
    // }
    return res.render('user_sign_in', {
        title: "Sign In"
    })
}


// sign in and create a session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();
    return res.redirect('/');
}

