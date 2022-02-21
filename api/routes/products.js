import express from "express";
import Product from '../models/product.js';
import mongoose from "mongoose";

const router = express.Router();

router.get("/", (req, res, next) => {
    Product.find().exec().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.post("/", (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        res.status(201).json(result)
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
})

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(data => {
        if(data){
            res.status(200).json(data);
        } else {
            res.status(404).json({
                msg: "No Valid Entry found for provided ID"
            })
        }
        
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
})

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findByIdAndUpdate(id, req.body, {new: true}).then(data => {
        res.status(203).json(data);
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id}).exec().then(data => {
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

export default router;
