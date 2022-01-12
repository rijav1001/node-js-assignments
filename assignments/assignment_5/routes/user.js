const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const User = require("../model/user");
const { body, validationResult } = require('express-validator');

router.post("/", body('email').isEmail(), body("name").isAlpha(),  async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ 
              errors: errors.array() 
            });
        }
        const user = await User.create(req.body);
        res.status(200).json({
            status: "Success",
            data: user
        })
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
});

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "Success",
            data: users
        })
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
});

router.get("/:id", body("id").isMongoId(), async (req, res) => {
    try {
        const users = await User.find({_id: req.params.id});
        res.status(200).json({
            status: "Success",
            data: users
        })
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
});

router.put("/:id", async (req, res) => {
    // console.log(req.body);
    try {
        const users = await User.findByIdAndUpdate({_id: req.params.id}, 
            req.body,  {new: true});
        res.status(200).json({
            status: "Success",
            data: users
        })
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
});

router.delete("/:id", async (req, res) => {
    // console.log(req.body);
    try {
        const users = await User.deleteOne({_id: req.params.id});
        res.status(200).json({
            status: "Success",
            data: users
        })
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
})

module.exports = router;