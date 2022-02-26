import Product from "../models/product.js";
import mongoose from "mongoose";

const products_get_all = (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then((data) => {
      const response = {
        count: data.length,
        products: data.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            productImage: doc.productImage,
            request: {
              type: "GET",
              url: "http://localhost:5000/products/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const products_create_product = (req, res, next) => {
  // console.log(req.file);

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: `http://localhost:5000/${req.file.path}`,
  });
  product
    .save()
    .then((result) => {
      res.status(201).json({
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:5000/products/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const products_get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({
          product: data,
          request: {
            type: "GET",
            url: "http://localhost:5000/products",
          },
        });
      } else {
        res.status(404).json({
          msg: "No Valid Entry found for provided ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

export default {
  products_get_all,
  products_create_product,
  products_get_product,
};
