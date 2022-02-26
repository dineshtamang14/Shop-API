import express from "express";
import cors from 'cors';
import productRoutes from "./api/routes/products.js";
import orderRoutes from "./api/routes/orders.js";
import userRoutes from "./api/routes/users.js";
import morgan from "morgan";
import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const mongodburl = process.env.URL;
mongoose.connect(mongodburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

mongoose.Promise = global.Promise;

// cors handling
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Header', 'Origin, X-Request-With, Content-Type, Accept, Authorization');
//     if(req.method === 'OPTIONS'){
//         res.header('Access-Contorl-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
//     next();
// });


app.use(morgan('dev'));

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/user", userRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            msg: error.message
        }
    })
})

export default app;
