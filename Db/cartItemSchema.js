let moongose=require('mongoose');
let Joi=require('@hapi/joi');
let PSchema=require('./ProductSchema');

let cartSchema=new moongose.Schema({
    productId:{type:moongose.Schema.Types.ObjectId,ref:'PrSchemaInfo',required:true},
    quantity:{type:Number,required:true},
    totalPrice:{type:Number,required:true},
    recordDate:{type:Date,default:Date.now()},
    updateRecord:{type:Date,default:Date.now()}

    

});
let CartModel=moongose.model('CartModel',cartSchema);
function Validation(message){
    let Schema=Joi.object({
        productId:Joi.required(),
        quantity:Joi.number().required(),
        totalPrice:Joi.number().required(),
        
    });
return Schema.validate(message);
}
module.exports={CartModel,cartSchema,Validation}