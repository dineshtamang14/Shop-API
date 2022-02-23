import express from "express";
import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/signup", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        res.status(409).json({
          msg: "Email Exits",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              Error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
            });
            user
              .save()
              .then((data) => {
                res.status(201).json({
                  msg: "user created",
                });
              })
              .catch((err) => {
                res.status(500).json({
                  Error: err,
                });
              });
          }
        });
      }
    });
});

router.delete("/:userId", (req, res, next) => {
    User.deleteOne({ _id: req.params.userId }).exec().then(result => {
        res.status(200).json({
            msg: "User deleted"
        })
    }).catch(err => {
        res.status(500).json({
            Error: err
        });
    })
})

export default router;
