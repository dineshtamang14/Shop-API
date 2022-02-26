import express from "express";
import multer from "multer";
import path from "path";
import checkAuth from "../middleware/check-auth.js";
import productsController from "../controllers/products.js";

const router = express.Router();
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (err, file, callback) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      callback(null, true);
    } else {
      callback(null, false);
    }
};

  // upload parameters for multer
const upload = multer({
    storage: storage,
    limits: {
      fieldSize: 1024 * 1024 * 10,
    },
    fileFilter: fileFilter,
});

router.get("/", productsController.products_get_all);

router.post(
  "/",
  upload.single("productImage"),
  checkAuth,
  productsController.products_create_product
);

router.get("/:productId", productsController.products_get_product);

router.patch("/:productId", checkAuth, productsController.products_update_product)

router.delete(
  "/:productId",
  checkAuth,
  productsController.products_delete_product
);

export default router;
