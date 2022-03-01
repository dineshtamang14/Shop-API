import Product from "../models/product.js";
import mongoose from "mongoose";

const products_get_all = (req, res, next) => {
  Product.find()
    .select("name price _id productImage productDes")
    .exec()
    .then((data) => {
      const response = {
        count: data.length,
        products: data.map((doc) => {
          return {
            _id: doc._id,
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            imgUrl: "http://localhost:5000/products/img/" + doc._id,
            productDes: doc.productDes,
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
  const {name, data} = req.files.productImage;

  if(name && data){
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price,
      productImage: name,
      imgData: data,
      productDes: req.body.productDes
    });
    product
      .save()
      .then((result) => {
        res.status(201).json({
          createdProduct: {
            _id: result._id,
            name: result.name,
            price: result.price,
            productDes: result.productDes,
            request: {
              type: "GET",
              url: "http://localhost:5000/products/" + result._id,
              imgUrl: "http://localhost:5000/products/img/" + result._id
            },
          },
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  }
};

const products_get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id productImage productDes")
    .exec()
    .then((data) => {
      if (data) {
        res.status(200).json({
          product: {
            _id: data._id,
            name: data.name,
            price: data.price,
            productImage: data.productImage,
            imgUrl: "http://localhost:5000/products/img/" + data._id,
            productDes: data.productDes
          },
          request: {
            type: "GET",
            url: "http://localhost:5000/products",
            imgUrl: "http://localhost:5000/products/img/" + data._id
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

const products_update_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      res.status(203).json({
        msg: "Product updated",
        request: {
          type: "GET",
          url: "http://localhost:5000/products/" + id,
          imgUrl: "http://localhost:5000/products/img/" + data._id
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const products_delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((data) => {
      res.status(200).json({
        msg: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:5000/products",
          body: { name: "String", price: "Number" },
        },
      });
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
  products_update_product,
  products_delete_product
};
