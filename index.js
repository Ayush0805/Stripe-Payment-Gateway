require("dotenv").config();
const express = require("express");
const app = express();
const cors = require('cors');
const morgan = require('morgan')



app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


const PaymentRoute = require('../Stripe/Routes/Payments/payments')



app.use('/payments',PaymentRoute)


const server=app.listen(8000, () => {
    console.log("Server running at http://10.0.0.22:8000");
  });