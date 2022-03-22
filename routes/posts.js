const express = require("express");
const postController = require("../controllers/posts-controller");
const authController = require("../controllers/auth-controller");

const router = express.Router({ mergeParams: true });

router.use(authController.protect);

router.get("/community", postController.getAllPosts);
router.post("/createPost", postController.createPost);
router.post("/activatePost", postController.activatePost);
router
  .route("/:id")
  .get(postController.getPost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
