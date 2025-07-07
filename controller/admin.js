const adminBA = require('../layers/bussinesslayer/adminBA');
const emailSender = require("../helpers/emailSender")

class adminController {

    async userList(req, res, next) {
        try {
            const { name, startDate, endDate } = req.query;
            let details = await adminBA.userListBA(name, startDate, endDate);
            res.status(200).json({ success: true, data: details });
        } catch(e) {
            next(e);
        }
    };

    async changeUserStatus(req, res, next) {
        try {
            const _id = req.params.id;
            const { isVerified, verifiedBy, notes } = req.body;
            let details = await adminBA.changeUserStatusBA(_id, isVerified, verifiedBy, notes);
            if(!details){
                res.status(200).json({ success: true, message: "Something went wrong while updating data"});
            }
            if(isVerified === "REJECTED") {
                let email = await emailSender.userRejectMail(details.email, details.userId, details.fullname);
            }
            let email = await emailSender.userApprovedMail(details.email, details.userId, details.fullname);
            res.status(200).json({ success: true, message: "Updated Successfully", data: details });
        } catch(e) {
            next(e);
        }
    };

}

module.exports = new adminController;