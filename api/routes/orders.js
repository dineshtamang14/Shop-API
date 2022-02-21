import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        msg: "your orders"
    });
});

router.post("/", (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        msg: "your orders were created",
        order: order
    });
});

router.get("/:orderId", (req, res, next) => {
    res.status(200).json({
        msg: "your orders for specific products are"
    });
});

router.delete("/:orderId", (req, res, next) => {
    res.status(200).json({
        msg: "your orders were deleted",
        orderId: req.params.orderId 
    });
});

export default router;
