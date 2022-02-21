import express from "express";
import cors from 'cors';
import productRoutes from "./api/routes/products.js";
import orderRoutes from "./api/routes/orders.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);


export default app;

