const userBA = require('../layers/bussinesslayer/userBA');
const rule = require('../helpers/userRule');
const Boom = require("@hapi/boom");
const emailSender = require('../helpers/emailSender')

class userController {

    async userForm(req, res, next) {
        try {
            let body = req.body;
            let files = req.files;

            const aadhaar = files.aadhaar ? files.aadhaar[0].location : null;
            const photograph = files.photograph ? files.photograph[0].location : null;
            const signature = files.signature ? files.signature[0].location : null;

            const { error } = rule.userForm.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let createdOn = new Date();
            body.createdOn = createdOn;

            const checkUser = await userBA.checkUserBA(body.phoneNumber, body.email);
            if(!checkUser) {
                const user = await userBA.userFormBA(body, aadhaar, photograph, signature);
                let email = await emailSender.userWelcomeMail(user.email, user.userId, user.fullname);
                let adminEmail = await emailSender.userRegMailAdmin(user.userId, user.fullname, user.email, user.phoneNumber);
                res.status(200).send({success: true, message: "User Created", data: user});
            } else {
                res.status(200).send({success: true, message: "User Already Exist"});
            }
        } catch (e) {
            next(e);
        }
    };

}

module.exports = new userController;