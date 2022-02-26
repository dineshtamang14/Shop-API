import express from "express";
import dotenv from "dotenv";
dotenv.config();
import userController from "../controllers/users.js";

const router = express.Router();

router.post("/signup", userController.user_signup);

router.post("/login", userController.user_login);

router.delete("/:userId", userController.user_delete);

export default router;
