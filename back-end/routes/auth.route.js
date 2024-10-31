import express from "express";
import {
  forgotPassword,
  login,
  logout,
  resetPassword,
  signup,
  verifyEmail,
  refreshToken,
  getProfile,
} from "../controllers/AuthController.js";

import  {userProtectRoute} from "../Middlewares/userMiddlewares.js";

const router = express.Router();

router.post("/signup", signup); // signup page

router.post("/login", login); // login page

router.post("/logout", logout); // logout page

router.post("/verify-email", verifyEmail); // verify email page

router.post("/forgot-password", forgotPassword); // forgot password page

router.post("/reset-password/:token", resetPassword); // reset password page


router.post("/refresh-token", refreshToken);
router.get("/profile", userProtectRoute, getProfile);
export default router;
