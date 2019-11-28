let moongose=require('mongoose');
let Joi=require('@hapi/joi');

let upfSchema=new moongose.Schema({
    image:{type:String,required:true}
})
let upfSchemaModel=moongose.model('upfschemaModel',upfSchema);

function validationError(message){
    let Schema=Joi.object({
        image:Joi.string().required()
    });
    return Schema.validate(message);
}
module.exports={upfSchemaModel,validationError};