let express=require('express');
let router=express.Router();
let cartSchema=require('../Db/cartItemSchema');
router.post('/add-to-cart', async(req,res)=>{
    try{
    let {error}=cartSchema.Validation(req.body);
    if(error){return res.status(404).send(error.details[0].message)}
    let CartItem=new cartSchema.CartModel({
        productId:req.body.productId,
        quantity:req.body.quantity,
        totalPrice:req.body.totalPrice,
    })
    let result=await CartItem.save();
    res.send({message:"Cart is added",d:result});
}

catch(ex)
{
    res.send(ex.message);
}

});
router.get('/allCarts',async (req,res)=>{
    try{
let data=await cartSchema.CartModel.find().populate('productId');
res.send(data);
    }
    catch(ex){
        res.send(ex.message);
    }
})
module.exports=router;