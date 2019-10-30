let express = require('express');
let R = require('../Db/RegisterSchema');

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
            resetPasswordToken: req.body.resetPasswordToken,
            resetPasswordExpire: req.body.resetPasswordExpire,
            isAdmin: req.body.isAdmin,
            recordDate: req.body.recordDate,
            updateDate: req.body.updateDate
        });
        let result = await data.save();
        res.send(result);

    }
    catch (ex) {
        res.send(ex.message);
    }
});
module.exports=router;