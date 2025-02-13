import express from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

// routing
//REGISTER || METHOD POST
router.post("/register", registerController);

//!LOGIN || METHOD POST
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController);

router.get("/test", requireSignIn, isAdmin, testController);

//! protected route user auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// //! protected route admin auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// UPDATE PROFILE
router.put("/profile", requireSignIn, updateProfileController);
export default router;
