const express = require("express");
const userController = require("../controllers/user-controller");
const authController = require("../controllers/auth-controller");
const postRouter = require("./posts");
const friendsRouter = require("./friends");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

router.use(authController.protect);

router.route("/:id/getProfile/").get(userController.getUserProfile);
router.post("/:id/createUserProfile", userController.createUserProfile);
router.route("/").get(userController.getAllUsers);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser);


router.use("/:id/posts", postRouter);


router.use("/:id/friends", friendsRouter);

module.exports = router;
