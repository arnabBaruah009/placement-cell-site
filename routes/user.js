const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../controllers/user_controller");

router.get("/signIn", userController.signIn);
router.get("/signUp", userController.signUp);
router.post("/create", userController.create);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/user/signIn" }),
  userController.createSession
);
router.get("/home", passport.checkAuthentication, userController.home);
router.get('/signOut', userController.destroySession);
router.get('/download', userController.download);

module.exports = router;
