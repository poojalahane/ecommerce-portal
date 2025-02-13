import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createProductController,
  deleteSingleProductController,
  getAllProductController,
  getSingleProductController,
  productCategoryController,
  productCountController,
  productFilterControllers,
  productListController,
  productPhotoController,
  relatedProductController,
  searchProductController,
  updateSingleProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);
router.get("/get-all", getAllProductController);
router.get("/get-single/:slug", getSingleProductController);
router.delete(
  "/delete-single/:pid",
  requireSignIn,
  isAdmin,
  deleteSingleProductController
);
router.put(
  "/update-single/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateSingleProductController
);

//! get photo
router.get("/product-photo/:pid", productPhotoController);
//! product filter controller
//router.post("/product-filters", productFilterController);

router.post("/product-filters", productFilterControllers);

//! product count controller
router.get("/product-count", productCountController);

//! product per page
router.get("/product-list/:page", productListController);

//! search product
router.get("/search/:keyword", searchProductController);

//! similar product
router.get("/related-product/:pid/:cid", relatedProductController);

//! Category wise Product
router.get("/product-category/:slug", productCategoryController);

export default router;
