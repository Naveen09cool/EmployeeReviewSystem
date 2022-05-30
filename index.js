const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const MongoStore = require('connect-mongo');


 

// app.use(express.urlencoded());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(expressLayouts);
app.use(cookieParser());
app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'empReviewSys',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie:{
        // session expires in how many miliseconds
        maxAge: (1000*60*100) 
    },
    store:MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/db',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || "connect-mongodb setup, ok"); 
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/',require('./routes'))

app.listen(port, function(err){
    if(err){
        console.log(`error in connecting port : ${err}`)
    }else{
        console.log(`Connected successfully on : ${port}`)
    }
})