let moongose=require('mongoose');
let Joi=require('@hapi/joi');
let Subcategory=require('./subCategoryschema');


let categorySchema=new moongose.Schema({
    catname:{type:String,required:true,minlength:2,maxlength:100},
    SubcatId:{type:Subcategory.subCat,required:true}
})
let categorySchemaInfo=moongose.model('categorySchemaInfo',categorySchema);
function ValidationError(message){
    let Schema=Joi.object({
        catname:Joi.string().required().min(2).max(100),
        SubcatId:Joi.required(),
    });
    return Schema.validate(message);
}
module.exports={categorySchemaInfo,ValidationError};