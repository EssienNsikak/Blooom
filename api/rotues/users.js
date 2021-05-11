const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');


// Get a User
router.get('/', async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;
  try {
    const user = userId 
      ? await User.findById(userId) 
      : await User.findOne({ username: username });
    if (!user) {
      res.status(404).json('User not found!')
    }
    const { password, updatedAt, ...other } = user._doc
    res.status(200).json(other)
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update User
router.put('/:id', async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  if (req.body.userId === req.params.id || req.body.isAdmin) {

    if (req.body.password) {
      try {
        req.body.password = bcrypt.hashSync(req.body.password, 10)
      } catch (err) {
        return res.status(500).json(err);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json('Your account has been UPDATED succesfully')
    } catch (err) {
      return res.status(500).json(err);
    }

  } else {
    return res.status(403).json('You can only UPDATE your account!')
  }
});

// Get Friends
router.get('/friends/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friends = await Promise.all(
      user.followings.map((friendId) => {
        return User.findById(friendId);
      })
    );
    let friendList = [];
    friends.map((friend )=> {
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Follow a User

router.put('/:id/follow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("You're now following this user")
      } else {
        res.status(403).json('You are already following this user!')
      }
    } catch (error) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't follow yourself!")
  }
});

// Unfollow a User

router.put('/:id/unfollow', async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);

      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("You've now unfollow this user")
      } else {
        res.status(403).json('You have unfollow this user already!')
      }
    } catch (error) {
      return res.status(500).json(err);
    }
  } else {
    res.status(403).json("You can't unfollow yourself!")
  }
});

// Delete User
router.delete('/:id', async (req, res) => {
  const user = await User.findById({ _id: req.params.id });
  if (req.body.userId === req.params.id || req.body.isAdmin) {

    try {
      const user = await User.findByIdAndDelete({ _id: req.params.id });
      res.status(200).json('Your account has been DELETED succesfully')
    } catch (err) {
      return res.status(500).json(err);
    }

  } else {
    return res.status(403).json('You can only DELETE your account!')
  }
});

module.exports = router;