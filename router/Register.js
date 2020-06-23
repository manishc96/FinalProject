let express = require('express');
let R = require('../Db/RegisterSchema');
let bcrypt=require('bcrypt');
let admin=require('../middleware/admin');
let auth=require('../middleware/user.auth');
let nodemailer=require('nodemailer');
let router = express.Router();
router.post('/register', async (req, res) => {
    try {
        let { error } = R.ValidationError(req.body);
        if (error) { return res.status(403).send(error.details[0].message) }
        let user = await R.register.findOne({ "UserLogin.userEmail": req.body.UserLogin.userEmail });
        if (user) { return res.status(402).send({ message: 'this email id is already exists' }) }
        let data = await new R.register({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            UserLogin:req.body.UserLogin,
            termsAcceptCheck: req.body.termsAcceptCheck,
            newsLetterCheck:req.body.newsLetterCheck
        });
        let salt = await bcrypt.genSalt(10);
         data.UserLogin.userPassword = await bcrypt.hash(data.UserLogin.userPassword, salt);
        let result = await data.save();
        let token =result.Generatetoken();
        res.send({meessage:"Welcome user we got your data ! now lets go back to login page",data:result});

    }
    catch (ex) {
        res.send(ex.message);
    }
});

    // get All Users
router.get('/Users',async(req,res)=>{
    try{
        let data=await R.register.find();
        res.send(data);
    }
            
    catch(ex){
        res.send(ex.message);
    }
});
//Delete User
router.delete('/removecustomer/:id',[auth,admin], async(req,res) => {
    let data = await R.register.findByIdAndRemove(req.params.id);
    if(!data) {res.status(403).send({message:'Invalid user id'})}
    res.send({message:'User Deleted! See you next time :`('})
});



module.exports=router;