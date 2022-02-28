import mongoose from "mongoose";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const user_signup = (req, res, next) => {
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
              name: req.body.name,
              email: req.body.email,
              password: hash,
              phone: req.body.phone,
              address: req.body.address
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
};

const user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          msg: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (error, response) => {
        if (error) {
          return res.status(401).json({
            msg: "Auth Failed",
          });
        }
        if (response) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            msg: "Auth successful",
            token: token,
          });
        }
        res.status(401).json({
          msg: "Auth Failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

const user_delete = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then((result) => {
      res.status(200).json({
        msg: "User deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        Error: err,
      });
    });
};

export default {
    user_signup,
    user_login,
    user_delete
}
