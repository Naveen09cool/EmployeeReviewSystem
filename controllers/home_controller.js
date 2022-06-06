const User = require('../models/user');


module.exports.home = async function(req, res){
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