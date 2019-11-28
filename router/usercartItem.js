let express=require('express');
let router=express.Router();
let UsercartItemSchema=require('../Db/usercartitemschema');
let cartItemSchema=require('../Db/cartItemSchema');
let auth=require('../middleware/user.auth');


router.post('/cartByUser',auth,async(req,res)=>{
    try{
    let {error}=UsercartItemSchema.Validation(req.body);
    if(error){return res.status(403).send(error.details[0].message)}
let CartItemId=await cartItemSchema.CartModel.findById(req.body.cartItemId);
if(!CartItemId){return res.status(404).send({message:"cartItem id not found"})};
   let userCartItem=new UsercartItemSchema.userCartModel({
    userEmail:req.body.userEmail,
    cartItemId:{
        _id:CartItemId._id,
        productId:CartItemId.productId,
        quantity:CartItemId.quantity,
        totalPrice:CartItemId.totalPrice,
        recordDate:CartItemId.recordDate,
        updateDate:CartItemId.updateDate
    }
   })
   let data =await userCartItem.save();
   res.send(data);
}
catch(ex){
    res.send(ex.message);
}
});
router.get("/allUserCart",auth,async(req,res)=>{
    try{
      let data= await UsercartItemSchema.userCartModel.find();
res.send(data);
    }
    catch(ex){
res.send(ex.message);
    }
});
router.put("/updateCart/:id",auth,async(req,res)=>{
    try{
        let  data=await UsercartItemSchema.userCartModel.findById(req.params.id);
        if(!data){return res.status(404).send({message:'Invaild Id '})};
        data.cartItemId.quantity=req.body.quantity;
        let result= await data.save();
        res.send(result);

    }
    catch(ex){
res.send(ex.message);
    }
});
router.delete("/remove-from-cart/:userEmail",auth,async(req,res)=>{
    try{
    let data=await UsercartItemSchema.userCartModel.findOneAndRemove(req.params.userEmail);
    if(!data){
        return res.status(404).send({messge:"Invalid Email id"});
    };
    res.send({message: "Removed the data"});
}
catch(ex){
    res.send(ex.message);
}
});
module.exports=router;