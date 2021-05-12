const router = require('express').Router();
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Create Comment
router.post('/:postId', async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.postId });
    if (!post) {
      res.status(404).json('Post not found!');
    }
    const comment = await Comment.create({ ...req.body, post });
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.postId,
      { $addToSet: { comments: comment._id } },
      { new: true, useFindAndModify: false },
    );
    return res.send({ data: { updatedPost }, code: 201 });
  } catch (err) {
    res.status(500).json(err)
  }
});

// Update Comment

router.put('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if (comment.userId === req.body.userId) {
      await comment.updateOne({ $set: req.body });
      res.status(200).json('Your comment have been UPDATED successfully')
    } else {
      res.status(403).json("You don't have the right to UPDATE this comment")
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

// Delete comment
router.delete('/:id', async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id)
    if (comment.userId === req.body.userId) {
      await comment.deleteOne();
      res.status(200).json('Your comment have been DELETED successfully')
    } else {
      res.status(403).json("You don't have the right to DELETE this comment")
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
