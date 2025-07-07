const { adminModel, userModel } = require('../../models/schema');
const bcrypt = require("bcrypt");
const moment = require("moment-timezone");
const saltRounds = 10;

const adminDataLayer = {

    async userFormDA(body){
        try {
            let userData = await adminModel({
                fullName: body.fullName,
                phoneNumber: body.phoneNumber,
                email: body.email,
                dob: body.dob,
                address: body.address,
                photograph: body.photograph,
                signature: body.signature,
                adhaar: body.adhaar,
                createdOn: body.createdOn
            })
            return userData;
        } catch(e) {
            throw e;
        }
    },

    async adminIsExistDA(email ,username, phoneNumber) {
        try {
            let result = await adminModel.findOne({
                $and: [
                    { email: email }, 
                    { username: username }, 
                    { phoneNumber: Number(phoneNumber)},
                ]
            });
            return result;
        } catch(e) {
            throw e;
        }
    },

    async adminExistDA(username) {
        try {
            const result = await adminModel.findOne({ username: username });
            return result;
        } catch(e) {
            throw e;
        }
    },

    async addAdminDA(body){
        try {
            let pass = body.password
            let createdOn = moment().format();
            let encodedPassword = await bcrypt.hash(pass, saltRounds);
            let result = new adminModel({
                name: body.name,
                email: body.email,
                username: body.username,
                phoneNumber: body.phoneNumber,
                password: encodedPassword,
                dob: body.dob,
                registredBy: body.registredBy,
                gender: body.gender,
                createdOn: createdOn
            });
            return await result.save();
        } catch(e) {
            throw e;
        }
    },

    async updateAdminFcmTokenDA(_id, sessionId) {
        try {
            return await adminModel.updateOne(
                { _id: _id },
                { $set: { fcmToken: sessionId } }
            );
        } catch (e) {
            throw e;
        }
    },

    async userListDA(name, startDate, endDate) {
        try {
            const query = {};

            if (name && name.trim() !== "") {
                query.fullname = { $regex: name, $options: "i" };
            }

            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(new Date(endDate).setHours(23, 59, 59, 999));
                query.createdOn = {
                    $gte: start,
                    $lte: end
                };
            }

            const users = await userModel.find(query);
            return users;
        } catch (e) {
            throw e;
        }
    },

    async changeUserStatusDA(_id, isVerified, verifiedBy, notes) {
        try {
            let result = await userModel.findOneAndUpdate(
                { _id: _id },
                {
                    $set: {
                        isVerified: isVerified,
                        verifiedBy: verifiedBy,
                        notes: notes,
                    },
                },
                { new: true }
            );
            return result;
        } catch (e) {
            throw e;
        }
    }

}

module.exports = adminDataLayer;