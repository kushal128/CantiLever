import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createProductController, deleteProductController, getProductController, getSingleProductController, productFiltersController, productPhotoController, searchProductController, updateProductController } from "../controllers/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
//create-product
router.post("/create-product", requireSignIn, isAdmin,formidable(),createProductController);
//get produtcs
router.get("/get-product", getProductController)
//get single product
router.get("/get-product/:slug", getSingleProductController)
//get photo
router.get("/product-photo/:pid",productPhotoController)
//delete product
router.delete("/product/:pid",deleteProductController)
//update product route
router.put("/update-product/:pid", requireSignIn, isAdmin,formidable(),updateProductController);
//filter product
router.post("/product-filters",productFiltersController)
//search product router
router.get("/search/:keyword",searchProductController)
export default router;
