let mailer=require('nodemailer');
let express=require('express');
let router=express.Router();
let crypto=require('crypto');
let model=require('../Db/RegisterSchema');
router.post('/mailer',async(req,res)=>{
    try{
let token=crypto.randomBytes(32).toString('hex');
let User=await model.register.findOne({"UserLogin.userEmail":req.body.UserLogin.userEmail});
if(!User) {return await res.status(401).send({message:'Invalid mail id'})};
    User.resetPasswordToken = token;
User.resetPasswordExpire = Date.now() + 3600000;
 User = await User.save();
let transporter = mailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'manishchandwani96@gmail.com', // generated ethereal user
        pass: 'manishr123' // generated ethereal password
    }
});

if (!transporter) res.status(401).send({
    message: 'something went wrong'
});
// setup email data with unicode symbols
let mailOptions = {
    from: '"Vs Apps:sweat_smile:" <manishchandwani96@gmail.com>', // sender address
    to: User.UserLogin.userEmail, // list of receivers
    subject: 'Reset Your Password', // Subject line:smile:
    text: 'open this link to change your password http://localhost:4200/forgotpassword/' + token // plain text body
};

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
});

res.send({
    'message': 'message send',
    'token': token,
    'data': User
});

} catch (ex) {
res.status(401).send(ex);
}

    
});
module.exports=router;
