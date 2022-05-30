const User = require('../models/user');


module.exports.home = async function(req, res){
    // try{
    //     if(req.user.isAdmin == true){
    //         // console.log(admins);
    //         return res.redirect('/admins/admin-view') 
    //     }
    //     // redirecting to EMPLOYEE
    //     return res.redirect('/employees/emp-view');
    // }catch(err){
    //     console.log('ERROR', err);
    //     return;
    // }

    try {
        let user = (req.body.user);
        return res.render('home',{
            title: "ReviewSys|Home",
            user : user
        })
    } catch (err) {
        console.log('ERROR', err);
        return;
    }
}