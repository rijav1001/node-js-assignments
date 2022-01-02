const express = require('express');
const faker = require('faker')
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));

var users = [];
for (let i = 0; i < 3; i++) {
    users.push({
        username: faker.name.findName(),
        email: faker.internet.email()
    })
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {users});
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.post('/user/add', (req, res) => {
    users.push({
        username: req.body.username,
        email: req.body.email
    });
    res.redirect('/');
});

app.listen(3000);