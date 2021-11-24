const payment= require('../../controller/Payments/payments')


const Stripe_Secret_Key = process.env.STRIPE_SECRET_KEY

const stripe = require('stripe')(Stripe_Secret_Key)

const StripeQuery= {};

StripeQuery.createCustomers = async function(Email){
    return await stripe.customers.create({
        description:'Customer of StripeBusiness',
        email:Email
    });
 }
StripeQuery.updateCustomers = async function(id,description){
     return await stripe.customers.update(
         id,
         {description:description}
     )
 }
StripeQuery.getCustomers = async function (limit){
     return await stripe.customers.list({
         limit:limit
     })
 }
StripeQuery.createCardToken = async function(number,exp_month,exp_year,cvc){
     return await stripe.tokens.create({
        card: {
            number: number,
            exp_month:exp_month,
            exp_year: exp_year,
            cvc: cvc,
          },
     })
 }
StripeQuery.createCustomerSource = async function(id,source){
     return await stripe.customers.createSource(
        id, 
        {
         source:source 
        })
     
 }
StripeQuery.createAccount =async function(type,country,email,name,product_description){
    return await stripe.accounts.create({
        type:type,
        country:country,
        email:email,
        business_type:"company",
        capabilities: {
            card_payments: {requested: true},
            transfers: {requested: true},
          },
          company:{
                name:name,
                tax_id:"00000000"
         },
          external_account:{
            object: "bank_account",
            country: country,
            currency : "inr",
            account_holder_name: name,
            routing_number:"HDFC0000261",
            account_number:"000123456789",
            account_holder_type: "company" ,

          },
          business_profile: {
              name:name,
              product_description:product_description
          },
          tos_acceptance:{
              date:Math.floor(Date.now() / 1000),
              ip:"10.0.0.22"
          },
    })
}
StripeQuery.updateAccount = async function(id,name,product_description){
    return await stripe.accounts.update(
        id,
    {
         business_profile: {
        name:name,
        product_description:product_description
    },

    })
}
StripeQuery.getaccountlist = async function(limit){
    return await stripe.accounts.list({
        limit:10
    })
}
StripeQuery.splitPayment = async function(amount,customer_id,account_id){
    return await stripe.charges.create({
        amount:amount*100,
        currency: 'INR',
        customer:customer_id,
        transfer_data: {
            amount: ((amount * 60) / 100) * 100,
            destination: account_id,
        },
        description:'First Payment'
    })
}
StripeQuery.createProduct = async function(name,description){
    return await stripe.products.create({
        name:name,
        description:description
    })
}
StripeQuery.getproductList = async function(limit){
    return await stripe.products.list({
        limit:limit
    })
}
StripeQuery.deleteCustomer = async function(id){
    return await stripe.customers.del(
        id
     )
}
StripeQuery.deleteCustomerAccount = async function(id){
    return await stripe.accounts.del(id)
}
StripeQuery.retrieveAccount = async function(id){
    return await stripe.accounts.retrieve(id)
}
StripeQuery.productPrice = async function(amount,product_id){
    return await stripe.prices.create({
        unit_amount:amount*100,
        currency : "inr",
        recurring: {interval: 'month'},
        product:product_id
    })
}
StripeQuery.getpriceList = async function(limit){
    return await stripe.prices.list({
        limit:limit
    })
}
StripeQuery.directPayment =async function(amount,source_id,description){
    return await stripe.charges.create({
        amount:amount * 100,
        currency:"inr",
        source:source_id,
        description:description
    })
}
StripeQuery.createSubscription= async function(customer_id,ProductPrice_id){
    return await stripe.subscriptions.create({
        customer : customer_id,
        items : [
            { price :ProductPrice_id}
        ]
    })
}
module.exports = StripeQuery



   



