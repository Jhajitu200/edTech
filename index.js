const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const user = require('./mongodb/user');
const course = require('./mongodb/course');
const app = express();

const  bodyParser = require('body-parser');
console.log(`this is user ${user}`)
console.log(`this is course ${course}`)
// const cookieParser = require('cookie-parser');
// const jwt = require('jsonwebtoken');
const port = 3000;
const ejs = require('ejs');
const { ObjectId } = require('mongodb');
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', async (req, res) => {
    res.render('index.ejs');
});

app.get('/check_admin', async (req,res) => {
    const data = await user.findOne({email: req.body.email});
    res.json(data);

})

app.get('/admin', (req, res) => {
    res.render('card/admin.ejs');
});

app.post('/set', async (req, res) => {
    const data = {
        heading: req.body.heading,
        description: req.body.description,
        price: req.body.price
    };
    try{
        const check = await course.findOne({heading:req.body.heading});
        console.log(`this is check ${check}`);
        if(check===null){
            await course.insertMany([data]);
            // res.render('index');
            res.end()
        }
        else {
            throw new Error("you have already signed in")
        }
    } 
    catch (err) {
        res.end(err.message);
    }
})

app.get('/courses',async(req,res) => {
    const data = await course.find({});
    res.json(data);
})

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});


app.post('/signup', async (req, res) => {
    const User = {
        username: req.body.username,
        email: req.body.email.toLowerCase(),
        password: req.body.password
    };
    try{
        // const check = await user.findOne({email:req.body.email});
        let check = await user.findOne({email:req.body.email.toLowerCase()});
        console.log(`this is check ${check}`);
        if(check===null){
            await user.insertMany([User]);
            const data = await user.find({});
            res.render('index',{data});
        }
        else {
        //     await collection.insertMany([data]);
        //     res.render('index.ejs');
        // }
        // else{
            throw new Error("you have already signed in")
        }
    } 
    catch (err) {
        res.end(err.message);
    }
});


app.post('/login', async (req, res) => {
    const data = {
        email: req.body.email.toLowerCase(),
        password: req.body.password
    };
    console.log(req.body);
    try {
        var check = await user.findOne({email: req.body.email.toLowerCase() });
        console.log(check);
        if(check===null){
            throw new Error("you have not signed in");
        }
        else if(check.password === req.body.password){
            // if(data.email === "jitujha2002@gmail.com"){
                
            // }
            res.redirect(`/dashboard/${check.email}`);
        }
        else if(check.password !== req.body.password || check.email !== req.body.email){
            if(check.email !== req.body.email.toLowerCase()){
                throw new error("you have entered wrong email address");
            }
            else{
                throw new Error("you hace entered wrong password");
            }
        }
    } catch (err) {
        res.end(err.message);
    }
}); 


app.get('/dashboard/:email', async (req, res) => {
    const email = req.params.email;
    console.log(`this is: ${email}`);
    try{
        console.log("here i am" )
        const dash=await user.findOne({email:email});
        res.render('dashboard.ejs', { dash });
    }
    catch(err){
        res.send(err.message);
    }
});


app.post('/buy', (req, res) => {
    
})


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
