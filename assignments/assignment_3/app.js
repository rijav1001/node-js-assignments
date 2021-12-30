const express = require('express');
const faker = require('faker')
const bodyParser = require('body-parser');
const app = express();

app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('public'));

var users = [];
for (let i = 0; i < 3; i++) {
    users.push({
        name: faker.name.findName(),
        email: faker.internet.email()
    })
}

app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {data:users});
});

app.get('/form', (req, res) => {
    res.render('form');
});

app.post('/user/add', (req, res) => {
    users.push({
        name: req.body.name,
        email: req.body.email
    })
    res.redirect('/');
});

app.listen(3000);