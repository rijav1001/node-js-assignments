const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const secret = "RESTAPI"


//-------------------------------REGISTER---------------------------------
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        bcrypt.hash(password, 10, async function (err, hash) {
            try {
                if (err) {
                    return res.status(400).send("Email Already Exists!");
                } else {
                    const user = await User.create({
                        name,
                        email,
                        password: hash
                    });
                    return res.status(200).send("Successfully registered");
                }
            } catch (err) {
                res.status(500).send("Failed");
            }
        });
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
});


//--------------------------------LOGIN------------------------------------
router.post("/login", async (req, res) => {
    try {
        // console.log(req.body);
        const { email, password } = req.body;
        // Load hash from your password DB.
        User.findOne({ email: req.body.email }).then((user) => {
            bcrypt.compare(password, user.password).then((err, result) => {
                if (result) {
                    // console.log(err);
                    const token = jwt.sign({
                        data: user._id
                    }, secret);
                    return res.status(200).json({
                        status: "Successfully logged in",
                        token: token
                    });
                } else {
                    res.status(403).send("Invalid credentials");
                }
            }).catch((err) => {
                res.status(500).send("Failed");
            });
        }).catch((err) => {
            res.status(500).send("User doesn't exist");
        });
    } catch(err) {
        res.status(500).send("Failed");
    }
});

module.exports = router;