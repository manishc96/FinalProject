let express = require('express');
let router = express.Router();
let Joi = require('@hapi/joi');
let bcrypt = require('bcrypt');
let model = require('../Db/RegisterSchema');


router.post('/forgotpassword/:id', async (req,res) => {
    try{
        let user = await model.register.findOne({resetPasswordToken: req.params.id, 
            resetPasswordExpire: {$gt:Date.now()}});
          if(!user) {return res.status(401).send({message:'Invalid token'})}
     let {error} = ValidationError(req.body);
     if(error) {return res.send(error.details[0].message)}
     console.log(user.UserLogin.userPassword);
     console.log(req.body.UserLogin.userPassword);
    let comparepassword = await bcrypt.compare(req.body.UserLogin.userPassword,user.UserLogin.userPassword);
    console.log(comparepassword);
     if(comparepassword) {return res.status(401).send({message:'this is old password make a new password!'})}
     let salt = await bcrypt.genSalt(10);
      user.UserLogin.userPassword = await bcrypt.hash(req.body.UserLogin.userPassword, salt);
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
      let data = await user.save();
      res.send({message:'password updated! Congrats, have a great day.:)', d:data})
  }
  catch(ex) {
      res.send(ex.message);
  }

});

function ValidationError(message) {
    let Schema = Joi.object({
        UserLogin:{
            userPassword: Joi.string().required()
        }
    });
return Schema.validate(message);
}
module.exports = router;