import express from "express";
import checkAuth from "../middleware/check-auth.js";
import productsController from "../controllers/products.js";
import Product from "../models/product.js";

const router = express.Router();


router.get("/", productsController.products_get_all);

router.post(
  "/",
  checkAuth,
  productsController.products_create_product
);

router.get("/img/:id", async (req, res) => {
  const id = req.params.id;
  Product.findById(id).exec().then(data => {
      res.end(data.imgData);
  }).catch(err => {
      console.log(err);
  })
})

router.get("/:productId", productsController.products_get_product);

router.patch("/:productId", checkAuth, productsController.products_update_product)

router.delete(
  "/:productId",
  checkAuth,
  productsController.products_delete_product
);

export default router;
