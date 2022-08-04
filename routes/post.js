const router = require("express").Router();

const {
    newPost,
    updatePost,
    delPost,
    likePost,
    getPost,
    timelinePost,
  } = require("../controllers/post");
  const Post = require("../models/Post");
  const User = require("../models/User");
  
  //create a post
  router.post("/", newPost);
  
  //update a post
  router.put("/:id", updatePost);
  
  //delete a post
  router.delete("/:id", delPost);
  
  //like and dislike a post
  router.put("/:id/like", likePost);
  
  //get a post
  router.get("/:id", getPost);
  
  //get timeline posts
  router.get("/timeline/all", timelinePost);
  
  module.exports = router;