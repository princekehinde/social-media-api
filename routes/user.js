const router = require('express').Router();
const {
    updateUser,
    delUser,
    getUser,
    followUser,
    unfollowUser,
  } = require("../controllers/user");
  const User = require("../models/User");
  
  //Update user
  router.put("/:id", updateUser);
  
  // Delete user
  router.delete("/:id", delUser);
  
  //Get a user
  router.get("/:id", getUser);
  
  //follow a user
  router.put("/:id/follow", followUser);
  
  //unfollow a user
  router.put("/:id/unfollow", unfollowUser);
  
  module.exports = router;