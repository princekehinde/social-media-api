const User = require("../models/User");
const bcrypt = require("bcrypt")

//Update a user
exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.user.isAdmin){
    if (req.body.password) {
      try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
      } catch (error){
        return res.status(500).json(error);
      }
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json("Account has been updated");
      } catch (error) {
        return res.status(500).json(error);
      }
    }
    } else {
    return res.status(403).json('you can update only your own profile');
  }
}

// Delete User
exports.delUser = async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You can only delete your account!");
  }
};

// Get a user

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updateAt, ...other } = user._doc;
    res.status(200).json(other);
    } catch (error) {
      return res.status(500).json(error);
      }
     };

    //  follow a user
    exports.followUser = async (req, res) => {
      if (req.body.userId !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.userId);
          if (!user.followers.includes(req.body.userId)) {
            await user.updateOne({ $push: { followers: req.body.userId } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("User has been followed");
          } else {
            res.status(403).json("You already follow this user!");
          }
        } catch (error) {
          return res.status(500).json(error);
        }
      } else {
        res.status(403).json("You cant follow yourself!");
      }
    };

//  unfollow a user
exports.unfollowUser = async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("User has been unfollowed");
      } else {
        res.status(403).json("You did not follow this user!");
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    res.status(403).json("You cant unfollow yourself!");
  }
};





