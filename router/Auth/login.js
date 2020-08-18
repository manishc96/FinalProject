let express = require('express');
let router = express.Router();
let Joi = require('@hapi/joi');
let R = require('../../Db/RegisterSchema');
let jwt = require('jsonwebtoken');
let config = require('config')
let bcrypt = require('bcrypt');
router.post('/login', async (req, res) => {
    try {
        let { error } = ValidationError1(req.body);
        if (error) { return res.status(403).send(error.details[0].message) };
        let user = await R.register.findOne({ "UserLogin.userEmail": req.body.UserLogin.userEmail });
        if (!user) { return res.status(403).send({ message: 'Invalid emailid please try again' }) }
        let password = await bcrypt.compare(req.body.UserLogin.userPassword, user.UserLogin.userPassword);
        if (!password) { return res.status(403).send({ message: 'Invalid password!' }) };
        let token = user.Generatetoken();
        res.header(`x-auth-token`, token).send({ message: "login sucessful", d: token })

    }
    catch (ex) {
        res.send({ Error: ex.message });

    }
});
function ValidationError1(error) {
    let Schema = Joi.object({
        UserLogin: {
            userEmail: Joi.string().required().email(),
            userPassword: Joi.string().required()
        }
    });
    return Schema.validate(error);
};

module.exports = router;