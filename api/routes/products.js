import express from "express";
import Product from '../models/product.js';
import mongoose from "mongoose";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads/');
    },
    filename: function(req, file, callback) {
        callback(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, res, callback) => {
    // to deny the file
    callback(null, false);

    // to accecpt the file
    callback(null, true);
}

const upload = multer({ storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
} });
const router = express.Router();

router.get("/", (req, res, next) => {
    Product.find().select('name price _id').exec().then(data => {
        const response = {
            count: data.length,
            products: data.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:5000/products/' + doc._id
                    }
                }
            })
        }
        res.status(200).json(response);
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.post("/", upload.single('productImage') ,(req, res, next) => {

    console.log(req.file);

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        res.status(201).json({
            createdProduct: {
                name: result.name,
                price: result.price,
                _id: result._id,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/products/' + result._id
                }
            }
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
})

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).select('name price _id').exec().then(data => {
        if(data){
            res.status(200).json({
                product: data,
                request: {
                    type: 'GET',
                    url: 'http://localhost:5000/products' 
                }
            });
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
        res.status(203).json({
            msg: "Product updated",
            request: {
                type: 'GET',
                url: 'http://localhost:5000/products/' + id
            }
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    Product.remove({_id: id}).exec().then(data => {
        res.status(200).json({
            msg: "Product deleted",
            request: {
                type: 'POST',
                url: 'http://localhost:5000/products',
                body: { name: 'String', price: 'Number' }
            }
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

export default router;
