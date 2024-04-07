const cookieParser = require("cookie-parser");
const express = require("express")
const app = express();
const errorMiddleware = require ('./middleware/error');
const bodyParser = require('body-parser');
const fileUpload = require("express-fileupload")
const path = require("path");
const dotenv =require ('dotenv');
const morgan = require('morgan');



// using config for environment variable 
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/.env" });
}



//route imports 
app.use(express.json());
app.use(cookieParser());
app.use(express.json({ limit: "50mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(fileUpload({useTempFiles: true}));
app.use(morgan('dev'));

const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const cart = require("./routes/WishListRoute");
const payment =require('./routes/paymentRoute')


app.use("/api/v2", order);
app.use("/api/v2", user);
app.use("/api/v2", product)
app.use("/api/v2",cart);
app.use("/api/v2", payment)

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("/", (req, res)=>{
//     res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
// })

// middleware for error
app.use(errorMiddleware);



module.exports = app;