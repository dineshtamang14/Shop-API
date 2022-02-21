import express from "express";

const router = express.Router();

router.get("/", (req, res, next) => {
    res.status(200).json({
        msg: "get all products",
    })
})

router.post("/", (req, res, next) => {
    res.status(201).json({
        msg: "updated"
    })
})

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId;
    if(id === "s"){
        res.status(200).json({
            msg: "u discorverd special", 
            id: id 
        })
    } else {
        res.status(200).json({
            msg: 'wrong id'
        });
    }
})

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId;
    if(id === "s"){
        res.status(200).json({
            msg: "u discorverd special", 
            id: id 
        })
    } else {
        res.status(200).json({
            msg: 'wrong id'
        });
    }
})

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId;
    if(id === "s"){
        res.status(200).json({
            msg: "u discorverd special", 
            id: id 
        })
    } else {
        res.status(200).json({
            msg: 'wrong id'
        });
    }
})

export default router;
