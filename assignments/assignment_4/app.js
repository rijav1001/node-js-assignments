const express = require('express');
const mongoose = require('mongoose');
const user = require('./model/Users');
var methodOverride = require('method-override');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost:27017/assignment4');
const app = express();

app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}))

app.set('views', './views');
app.set('view engine', 'ejs');

// Base route, GET
app.get('/', async(req, res) => {
    var users = await user.find();
    res.render('index', {users});
});

// Form route, GET
app.get('/form', async(req, res) => {
    res.render('form');
});

// Create using POST
app.post('/user/add', async(req, res) => {
    await user.create({
        username: req.body.username,
        email: req.body.email,
        isPromoted: null
    });
    res.redirect('/');
});

// Update using PUT
app.put('/user/:id', async(req, res) => {
    await user.findByIdAndUpdate(req.params.id, [{ $set: { isPromoted: { $not: "$isPromoted" }}}]);
    res.redirect('/');
})

// Delete using DELETE
app.delete('/user/:id', async(req, res) => {
    // console.log(req.params._id);
    await user.findByIdAndDelete(req.params.id)
    res.redirect('/');
})

app.listen(3000, () => console.log("Server is listening"));