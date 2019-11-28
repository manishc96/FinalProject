let mongoose=require('mongoose');
let Joi=require('@hapi/joi');
let subCat=new mongoose.Schema({
    name:{type:String,required:true,minlength:3,maxlength:100}
})
let subCatInfo=mongoose.model('subCatInfo',subCat);
function ValidationError(message){
    let Schema=Joi.object({
        name:Joi.string().required().min(3).max(100)
    })
    return Schema.validate(message);
}
module.exports={subCatInfo,ValidationError,subCat};