let moongose=require('mongoose');
let Joi=require('@hapi/joi');

let PrSchema=new moongose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:100},
    image:{type:String,required:true,minlength:3,maxlength:100},
    description:{type:String,required:true,minlength:3,maxlength:1000},
    price:{type:Number,required:true,minlength:1},
    offerPrice:{type:Number,required:true,minlength:1},
    isAvailable:{type:Boolean},
    isTodayOffer:{type:Boolean,required:true},
    Category:{type:String,required:true,minlength:3,maxlength:100},
    subCategory:{type:String,required:true,minlength:3,maxlength:100},
    isAdmin:{type:Boolean},
    recordDate:{type:Date,default:Date.now},
    updateDate:{type:Date,default:Date.now}

});
let PrSchemaInfo=moongose.model('PrSchemaInfo',PrSchema);
function ValidationError(message){
    let Schema=Joi.object({
name:Joi.string().min(2).required().min(3).max(100),
image:Joi.string().required().min(3).max(100),
description:Joi.string().required().min(3).max(1000),
price:Joi.number().required().min(1),
offerPrice:Joi.number().required().min(1),
isAvailable:Joi.boolean(),
isTodayOffer:Joi.boolean().required(),
Category:Joi.string().required().min(3).max(100),
subCategory:Joi.string().required().min(3).max(100)
    });
    return Schema.validate(message);
}
module.exports={PrSchemaInfo,ValidationError}
