const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login');
const postRoutes = require('./routes/posts');
const User = require('./model/user');
var jwt = require('jsonwebtoken');
const secret = 'RESTAPI';
mongoose.connect('mongodb://localhost:27017/assignment5', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("DB connected");
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.use("/api/v1/", loginRoutes);

app.use("/api/v1/posts", async (req, res, next) => {
    try {
        // console.log(req.headers);
        const token = req.headers.authorization.split("test")[1];
        // console.log(token);
        if (!token) {
            return res.status(403).send("Request not valid");
        } else {
            jwt.verify(token, secret, function (err, decoded) {
                // console.log(err, decoded);
                if (err) {
                    return res.status(403).send("Invalid token");
                }
                const user_u = User.findOne({ _id: decoded._id });
                // console.log(user);
                req.user = user_u._id;
                next();
            });
        }
    } catch (err) {
        res.status(404).json({
            status: "Failed",
            message: "User not found"
        });
    }
});

app.use("/api/v1/posts", postRoutes);

app.listen(3000, () => console.log('Server is running'));