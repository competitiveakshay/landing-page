const express = require('express');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('express-flash');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
    secret: "secret key",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge:60000
    }
}))

app.use(flash());


app.engine('ejs' , ejsMate);
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views')); // views folder
app.use(express.static(path.join(__dirname , 'public'))); // public folder
app.use(express.urlencoded({extended:true}));

let isFormSubmitted = false;


app.get('/' , (req,res)=>{
    res.render('home' , { isFormSubmitted , messages:req.flash()});
})

app.post('/' , (req,res)=>{
    const {firstname, lastname, email, message} = req.body;
    
    if(!firstname || !lastname || !email || !message){
        req.flash("error" , "Enter the required fields");
        return res.redirect('/');
    }
    else{
        isFormSubmitted = true;
    }

    res.redirect('/');
})


app.listen(8080 , ()=>{
        console.log("Server Connected at Port 8080");
})






