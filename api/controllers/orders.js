import Order from "../models/order.js";
import Product from "../models/product.js";
import mongoose from "mongoose";

const orders_get_all = (req, res, next) => {
    Order.find().select('product quantity _id').populate('product', 'price').then(data => {
        res.status(200).json({
            count: data.length,
            orders: data.map(doc => {
                return {
                    _id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity,
                    total: doc.total,
                    request: {
                        type: "GET",
                        url: "http://localhost:5000/orders/" + doc._id
                    }
                }
            })
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

const orders_create_order = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          msg: "Product Not Found",
        });
      }

      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId,
        total: req.body.total
      });
      return order.save();
    })
    .then((data) => {
      res.status(201).json({
        msg: "Order Stored",
        createdOrder: {
          _id: data._id,
          product: data.product,
          quantity: data.quantity,
          total: data.total,
        },
        request: {
          type: "GET",
          url: "http://localhost:5000/orders/" + data._id,
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const orders_get_order = (req, res, next) => {
  Order.findById(req.params.orderId)
    .select("product quantity _id createdAt updatedAt total")
    .populate("product", "price")
    .exec()
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          msg: "Order Not Found",
        });
      }
      res.status(200).json({
        order: data,
        request: {
          type: "GET",
          url: "http://localhost:5000/orders",
        },
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

const orders_delete_order = (req, res, next) => {
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then((data) => {
      res.status(200).json({
        message: "Order deleted",
        request: {
          type: "POST",
          url: "http://localhost:5000/orders",
          body: {
            productId: "ID",
            quantity: "Number",
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

export default {
    orders_get_all,
    orders_create_order,
    orders_get_order,
    orders_delete_order
}
