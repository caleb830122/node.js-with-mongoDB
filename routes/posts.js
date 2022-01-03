const express = require("express");
const { json } = require("express/lib/response");

const router = express.Router();
const Post = require("../models/Post");

// Get All Posts
router.get("/", async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

// Post one post
router.post("/", async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description,
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// Get post by ID
router.get("/:postID", async (req, res) => {
    try {
        const posts = await Post.findById(req.params.postID);
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

// Delete post by ID
router.delete("/:postID", async (req, res) => {
    try {
        const removedPost = await Post.deleteOne({ _id: req.params.postID });
        res.json(removedPost);
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Update a post
router.patch("/:postID", async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postID },
            { $set: { title: req.body.title } }
        );
        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
});
module.exports = router;
