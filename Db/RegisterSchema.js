let mongoose=require('mongoose');
let Joi=require('@hapi/joi')
let urSchema=new mongoose.Schema({
    firstName:{type:String,required:true,minlength:5,maxlength:250},
    lastName:{type:String,required:true,minlength:5,maxlength:250},
    UserLogin:{
        userEmail:{type:String,required:true,unique:true},
        userPassword:{type:String,required:true}
    },
    termsAcceptCheck:{type:Boolean,required:true},
    resetPasswordToken:{type:String,required:true},
    resetPasswordExpire:{type:String,required:true},
    isAdmin:{type:Boolean},
    recordUpdate:{type:Date,required:false},
    updatedate:{type:Date,required:false}
});
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
        resetPasswordToken:Joi.string().required(),
        resetPasswordExpire:Joi.string().required(),
        isAdmin:Joi.boolean(),
        recordUpdate:Joi.date(),
        updatedate:Joi.date()
    });
    return Schema.validate(message);

}










module.exports={register,ValidationError};