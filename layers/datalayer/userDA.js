const {userModel} = require('../../models/schema');

const userDataLayer = {

    async userFormDA(body, aadhaar, photograph, signature){
        try {
            let userData = await userModel({
                fullname: body.fullname,
                phoneNumber: body.phoneNumber,
                email: body.email,
                dob: body.dob,
                address: body.address,
                photograph: photograph,
                signature: signature,
                aadhaar: aadhaar,
                createdOn: body.createdOn
            })
            return userData.save();
        } catch(e) {
            throw e;
        }
    },

    async checkUserDA(phoneNumber, email){
        try {
            let result = await userModel.findOne({
                    $and: [
                        { email: email },
                        { phoneNumber: Number(phoneNumber)},
                    ]
                });
                return result;
        } catch(e) {
            throw e;
        }
    }

}

module.exports = userDataLayer;