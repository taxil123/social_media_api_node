const express = require("express");
const userController = require("../controllers/user-controller");
const authController = require("../controllers/auth-controller");
const postRouter = require("./posts");
const friendsRouter = require("./friends");

const router = express.Router();

// SignUp/Login/Authentication
router.post("/signup", authController.signUp);
router.post("/login", authController.login);

router.use(authController.protect);

// User Profile
router.route("/:id/getProfile/").get(userController.getUserProfile);
router.post("/:id/createUserProfile", userController.createUserProfile);
router
  .route("/updateUserProfile/:id")
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateProfile
  );

router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser);

// User Posts
router.use("/:id/posts", postRouter);

// User Friends
router.use("/:id/friends", friendsRouter);

module.exports = router;
