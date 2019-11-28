let express=require('express');
let router=express.Router();
let C=require('../Db/ContactModelSchema');
let mailer=require("nodemailer");

router.post('/Contact',async (req,res)=>{
    try{
    let {error}=C.ValidationError(req.body);
    if (error) { return res.status(403).send(error.details[0].message) };
    let data= await new C.contactModel({
        name:req.body.name,
        email:req.body.email,
        message:req.body.message
    });
    let result = await data.save();
    //res.send(result);
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
    let mailOptions = {
        from: '"Vs Apps:sweat_smile:" <manishchandwani96@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: 'Thank you for Contact us', // Subject line:smile:
        text: "Thank you for Contact us.We will contact you soon"
    };
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
        'message': 'message sent'});
    }
    catch(ex){
        res.send(ex.message);
    }

})
module.exports=router;