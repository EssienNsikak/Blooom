const router = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Create a Post
router.post('/', async (req, res) => {
  const newPost = new Post(req.body)
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
})

// Update a Post
router.put('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('Your post have been UPDATED successfully')
    } else {
      res.status(403).json("You don't have the right to UPDATE this post")
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

// Get a Post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json('Post not found!');
    } else {
      res.status(200).json(post);
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

// Get timeline posts
router.get('/timeline/:userId', async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get User's all posts
router.get('/profile/:username', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: user._id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Like / Dislike a Post
router.put('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('Your post has been liked by a user');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('Your post has been disliked by a user');
    }
  } catch (err) {
    res.status(500).json(err);
  }
})

// Delete a Post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json('Your post have been DELETED successfully')
    } else {
      res.status(403).json("You don't have the right to DELETE this post")
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;