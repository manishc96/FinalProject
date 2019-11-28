let moongose=require('mongoose');
let Joi=require('@hapi/joi');
let UserCart=require('./cartItemSchema');

let userCartSchema= new moongose.Schema({
    userEmail:{type:String,required:true},
    cartItemId:{type:UserCart.cartSchema,required:true}
});
let userCartModel=moongose.model('userCartModel',userCartSchema);
function Validation(message){
    let Schema=Joi.object({
        userEmail:Joi.string().required(),
        cartItemId:Joi.required()   })
        return Schema.validate(message);
}
module.exports={userCartModel,Validation,userCartSchema}