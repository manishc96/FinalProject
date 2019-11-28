let mongoose=require('mongoose');
let jwt=require('jsonwebtoken');
let config=require('config');
let Joi=require('@hapi/joi')
let urSchema=new mongoose.Schema({
    firstName:{type:String,required:true,minlength:5,maxlength:250},
    lastName:{type:String,required:true,minlength:5,maxlength:250},
    UserLogin:{
        userEmail:{type:String,required:true,unique:true},
        userPassword:{type:String,required:true}
    },
    termsAcceptCheck:{type:Boolean,required:true},
    newsLetterCheck:{type:Boolean},
    resetPasswordToken:{type:String},
    resetPasswordExpire:{type:Date},
    isAdmin:{type:Boolean},
    recordUpdate:{type:Date},
    updatedate:{type:Date}
});
urSchema.methods.Generatetoken=function(){
    let token =jwt.sign({_id:this._id,isAdmin:this.isAdmin},config.get('Pkapps'));
    return token;
}
let register=mongoose.model("Register",urSchema);

function ValidationError(message){
    let Schema=Joi.object({
        firstName:Joi.string().min(5).max(250).required(),
        lastName:Joi.string().min(5).max(250),
        UserLogin:{
            userEmail:Joi.string().required().email(),
            userPassword:Joi.string().required()
        },
        termsAcceptCheck:Joi.boolean().required(),
        resetPasswordToken:Joi.string(),
        resetPasswordExpire:Joi.string(),
        newsLetterCheck:Joi.boolean(),
        isAdmin:Joi.boolean(),
        recordUpdate:Joi.date(),
        updatedate:Joi.date()
    });
    return Schema.validate(message);

}
module.exports={register,ValidationError,urSchema};