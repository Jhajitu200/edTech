const express = require('express');
const path = require('path');
const collection = require('./mongodb/course');
const app = express();
const port = 4000;
const ejs = require('ejs');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('card/admin.ejs');
});

app.post('/set', async (req, res) => {
    const data = {
        heading: req.body.heading,
        description: req.body.description,
        price: req.body.price
    };
    try{
        const check = await collection.findOne({heading:req.body.heading});
        console.log(`this is check ${check}`);
        if(check===null){
            await collection.insertMany([data]);
            res.redirect('./index');
        }
        else {
            throw new Error("you have already signed in")
        }
    } 
    catch (err) {
        res.end(err.message);
    }
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});