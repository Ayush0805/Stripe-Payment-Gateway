const { createSubscription } = require('../../Models/Payments/payments')
const StripeQuery = require('../../Models/Payments/payments')


module.exports={

    async CreateCustomers(req,res){
        const Email=req.body.Email
        if(!Email) return res.status(422).send({code:422,status:'failure',message:'Email is Required'})
        try{
            let customers = await StripeQuery.createCustomers(Email)
            return res.status(200).send({code:200,status:'success',Data:customers})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async UpdateCustomers(req,res){
        const id= req.body.id
        const description= req.body.description
        if(!id || !description) return res.status(422).send({code:422,status:'failure',message:'Data is missing'})
        try{
            let Customer = await StripeQuery.updateCustomers(id,description)
            return res.status(200).send({code:200,status:'success',Data:Customer})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async GetCustomers(req,res){
        // const id=req.body.id
        const limit =req.body.limit
        if( !limit) return res.status(422).send({code:422,status:'failure',message:"Data  Required"})
        try{
           let List= await StripeQuery.getCustomers(limit)
           return res.status(200).send({code:200,status:'success',Data:List})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    } ,
    async CreateCardToken(req,res){
        const number = req.body.number
        const exp_month = req.body.exp_month
        const exp_year = req.body.exp_year
        const cvc = req.body.cvc
        if(!number || !exp_month ||!exp_year || !cvc) return res.status(422).send({code:422,status:'failure',message:'Incorrect Data'})
        try{
            let Token = await StripeQuery.createCardToken(number,exp_month,exp_year,cvc)
            return res.status(200).send({code:200,status:'success',Data:Token})
        }catch(err){
            return  res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async CreateCustomerSource(req,res){
        const id= req.body.id
        const source = req.body.source // card token id
        if(!id || !source) return res.status(422).send({code:422,status:'failure',message:'Data is required'})
        try{
            let Source = await StripeQuery.createCustomerSource(id,source)
            return res.status(200).send({code:200,status:'success',data:Source})
        }catch(err){
            console.log("ERROR:::::::::",err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }

    },
    async CreateAccount(req,res){
        const type = req.body.type
        const country =req.body.country
        const email = req.body.email
        const name = req.body.name
        const product_description = req.body.product_description
        if(!type || !country || !email ||!name ||!product_description) return res.status(422).send({code:422,status:'failure',message:"Data Required"})
        try{
           let Account= await StripeQuery.createAccount(type,country,email,name,product_description)
           return res.status(200).send({code:200,status:'success',data:Account})
        }catch(err){
            console.log("ERROR::::::::",err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async UpdateAccount(req,res){
        const id= req.body.id //account id
        const name = req.body.name
        const product_description= req.body.product_description
        if(!id || !name || !product_description) return res.status(422).send({code:422,status:'failure',message:'Data Required'})
        try{
            let Update = await StripeQuery.updateAccount(id,name,product_description)
            return res.status(200).send({code:200,status:"success",Data:Update})
        }catch(err){
            console.log("ERROR::::",err)
            return res.status(422).send({code:422,status:'failure',message:err.message})
      }
    },
    async AccountsList(req,res){
        const limit= req.body.limit
        if(!limit) return res.status(422).send({code:422,status:'failure',message:'Limit is missing'})
        try{
            let List = await StripeQuery.getaccountlist(limit)
            console.log(List.data.length);
            return res.status(200).send({code:200,status:'success',Data:List})

        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async SplitPayment(req,res){
        const amount = req.body.amount
        const customer_id = req.body.customer_id
        const account_id = req.body.account_id
        if(!amount || !customer_id || !account_id) return res.status(422).send({code:422,status:'failure',message:'Data required'})
        try{
            let Payment = await StripeQuery.splitPayment(amount,customer_id,account_id) 
            return res.status(200).send({code:200,status:'success',data:Payment})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async CreateProduct(req,res){
        const name = req.body.name
        const description = req.body.description
        if(!name || !description) return res.status(422).send({code:422,status:'failure',message:'Data required'})
        try{
            let Product = await StripeQuery.createProduct(name,description)
            return res.status(200).send({code:200,status:'success',data:Product})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async ProductList(req,res){
        const limit = req.body.limit
        try{
            let List = await StripeQuery.getproductList(limit)
            return res.status(200).send({code:200,status:'success',data:List})

        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async DeleteCustomer(req,res){
        const id = req.body.id
        if( !id ) return res.status(422).send({code:422,status:'failure', message:'Customer id is required'})
        try{
            let DeleteData =await StripeQuery.deleteCustomer(id)
            return res.status(200).send({code:200,status:'success',Data:DeleteData})
        }catch(err){
            return res.status(422).send({code:422,status:'failure', message:err.message})
        }
    },
    async DeleteAccount(req,res){
        const id = req.body.id
        if(!id) return res.status(422).send({code:422,status:'failure',message:'Account is required'})
        try{ 
            let Delete = await StripeQuery.deleteCustomerAccount(id)
            return res.status(200).send({code:200,status:'success',data:Delete})

        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async RetrieveAccount(req,res){
        const id = req.body.id
        if(!id) return res.status(422).send({code:422,status:"failure",message:"Account id is required"})
        try{
            let Data = await StripeQuery.retrieveAccount(id)
            return res.status(200).send({code:200,status:"success",data:Data})
        }catch(err){
            return res.status(422).send({code:422,status:"failure",message:err.message})
        }
    },
    async ProductsPrice(req,res){
        const amount = req.body.amount
        const product_id = req.body.product_id
        if(!amount || !product_id) return res.status(422).send({code:422,status:'failure',message:'Data required'})
        try{
            let ProductData = await StripeQuery.productPrice(amount,product_id)
            return res.status(200).send({code:200,status:'success',data:ProductData})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async PriceList(req,res){
        const limit = req.body.limit
        if(!limit) return res.status(422).send({code:422,status:"failure",message:"Data required"})
        try{
            let List = await StripeQuery.getpriceList(limit)
            return res.status(200).send({code:200,status:'success',data:List})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async DirectPayment(req,res){
        const amount = req.body.amount
        const source_id = req.body.source_id
        const description= req.body.description
        if(!amount || !source_id || !description) return res.status(422).send({code:422,status:"failure",message:"Data required"})
        try{
            let Data = await StripeQuery.directPayment(amount,source_id,description)
            return res.status(200).send({code:200,status:'success',data:Data})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    },
    async CreateSubscription(req,res){
        const customer_id = req.body.customer_id
        const ProductPrice_id = req.body.ProductPrice_id
        if(!customer_id || !ProductPrice_id)  return res.status(422).send({code:422,status:'failure',message:"Data required"})
        try{
            let Data = await StripeQuery.createSubscription(customer_id,ProductPrice_id)
            return res.status(200).send({code:200,status:'success',data:Data})
        }catch(err){
            return res.status(422).send({code:422,status:'failure',message:err.message})
        }
    }
}