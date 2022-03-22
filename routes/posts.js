const express = require("express");
const postController = require("../controllers/posts-controller");
const authController = require("../controllers/auth-controller");

//mergeParams preserves the req.params value from parent router, if conflicting param
//names arise in parent anc child routes then child takes precedence
//by default each router has access to parameters of their specific routes, in route below
const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get("/community", postController.getAllPosts);
router.post("/createPost", postController.createPost);

// Individual Post
router
  .route("/:id")
  .get(postController.getPost)
  .delete(postController.deletePost);

module.exports = router;
