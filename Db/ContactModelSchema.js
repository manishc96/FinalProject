let moongose=require('mongoose');
let Joi=require('@hapi/joi');
let CMSchema=new moongose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true}
})
let contactModel=moongose.model('ContactModel',CMSchema);
 

function ValidationError(message){
    let Schema=Joi.object({
        name:Joi.string().required(),
        email:Joi.string().required(),
        message:Joi.string().required()
    });
    return Schema.validate(message);
}
module.exports={contactModel,ValidationError}