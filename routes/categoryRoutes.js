import express from "express";

import {
  createCategoryController,
  deleteSingleCategoryController,
  getAllCategoryController,
  getSingleCategoryController,
  updateSingleCategoryController,
} from "../controllers/categoryController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);
router.get("/get-single/:slug", getSingleCategoryController);
router.get("/get-all", getAllCategoryController);
router.delete(
  "/delete-single/:id",
  requireSignIn,
  isAdmin,
  deleteSingleCategoryController
);
router.put(
  "/update-single/:id",
  requireSignIn,
  isAdmin,
  updateSingleCategoryController
);

export default router;
