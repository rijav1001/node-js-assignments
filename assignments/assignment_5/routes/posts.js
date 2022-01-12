const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const faker = require("faker");


router.get("/", async (req, res)=>{
    try {  
        const posts = await Post.find();  
        res.status(200).json({
            status: "Success",
            data: posts
        })   
    } catch(err) {
        res.status(500).send("Failed");
    }
});

router.post("/",  async (req, res)=>{
    try {  
        // console.log(req.body) ;
        // console.log(req.user) ;
        await Post.create({
            title: req.body.title,
            body: req.body.body,
            image: faker.internet.avatar(),
            user: req.user
        }).then((post) => {
            res.status(200).send(post);
        }).catch((err) => {
            res.status(500).send("Failed");
        })
    } catch(err) {
        res.status(500).send("Failed");
    }
});

router.delete("/:id", async (req, res) => {
    const userId = req.params.id;
    await Post.findOne({ _id: req.params.id }).then((result) => {
        if (result.user == userId){
            Post.deleteOne({ _id: req.params.id }).then((res) => {
                res.status(200).send(res);
            }).catch((err) => {
                res.status(501).send("Failed");
            })     
        } else {
            res.status(403).send("You are not authorized to delete this post");
        }
    }).catch((err) => {
        res.status(500).send("Not found");
    })
});

router.put("/:id", async (req, res) => {
    const userId = req.params.id;
    await Post.findOne({ _id: req.params.id }).then((res) => {
        if (res.user == userId) {
            Post.findByIdAndUpdate({ _id: req.params.id }, req.body).then((toSend) => {
                res.status(200).send(toSend);
            }).catch((err) => {
                res.status(501).send("Failed");
            })
        } else {
            res.status(403).send("You are not authorized to edit this post");
        }
    }).catch((err) => {
        res.status(500).send("Not found");
    })
});

module.exports = router;