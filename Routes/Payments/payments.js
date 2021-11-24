const express = require("express");
const {CreateCustomers, UpdateCustomers , GetCustomers , CreateCardToken, CreateCustomerSource, CreateAccount , UpdateAccount , AccountsList , SplitPayment ,CreateProduct , ProductList ,DeleteCustomer ,DeleteAccount,RetrieveAccount ,ProductsPrice ,PriceList,DirectPayment, CreateSubscription} = require('../../Controller/Payments/payments');

const Route = express.Router();

Route.post('/create-customers',CreateCustomers)
Route.post('/update-customers',UpdateCustomers)
Route.get('/get-customers',GetCustomers)
Route.post('/card-token',CreateCardToken)
Route.post('/create-source',CreateCustomerSource)
Route.post('/create-account',CreateAccount)
Route.post('/update-account',UpdateAccount)
Route.get('/get-accounts-list',AccountsList)
Route.post('/split-payment',SplitPayment)
Route.post('/create-product',CreateProduct)
Route.get('/get-product-list',ProductList)
Route.delete('/delete-customer',DeleteCustomer)
Route.delete('/delete-customer-account',DeleteAccount)
Route.post('/retrieve-accounts',RetrieveAccount)
Route.post('/product-price',ProductsPrice)
Route.get('/get-price-list',PriceList)
Route.post('/direct-payment',DirectPayment)
Route.post('/create-subscription',CreateSubscription)


module.exports = Route