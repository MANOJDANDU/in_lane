const redisClient = require("../config/redisConfig");
const Boom = require("@hapi/boom");
const ua_parser = require("ua-parser-js");
const bcrypt = require("bcrypt");
const adminBA = require("../layers/bussinesslayer/adminBA");
const rule = require("../helpers/authenticationRule");
const utilities = require("../helpers/utilities")

async function redisGet(key) {
    try {
        const value = await redisClient.get(key);
        return value;
    } catch (err) {
        console.error("Error retrieving from Redis:", err);
        throw err;
    }
};

class authentication {

    async addAdmin(req, res, next) {
        try {
            let body = req.body
            const { error } = rule.addAdminRule.validate(body);
            if (error) {
                throw Boom.badData(error.message);
            }
            let adminExist = await adminBA.adminIsExistBA(body.email, body.username, body.phoneNumber);
            if (adminExist){
                res.send({ success: true, message: "Admin Already Exist"});
            } else {
                let response = await adminBA.addAdminBA(body);
                res.send({ success: true, data: response});
            }
        } catch(e) {
            next(e);
        }
    };

    async adminLogin(req, res, next) {
        try {
            let adminAgent = ua_parser(req.headers["user-agent"]);
            
            let { username, password, fcmToken } = req.body;
            let response = await adminBA.adminExistBA(username);
            if (!response) {
                res.send({ success: true, message: "Admin not Exist" });
            } else {
                let passwordCheck = await bcrypt.compare(password, response.password);
                if (passwordCheck) {
                    let details = await createAdminSession(response, res, adminAgent);
                    await adminBA.updateAdminFcmTokenBA(response._id, details.sessionId);
                    res.send({
                        success: true, 
                        data: {
                            _id: details._id,
                            authToken: details.fcmToken
                        } 
                    });
                } else {
                    res.send({
                        success: false, 
                        message: "Incorrect Password"
                    });
                }
            }
        } catch (e) {
          next(e);
        }
    };
}

async function createAdminSession(response, res, userAgent) {
    response = JSON.parse(JSON.stringify(response));
    let sessionKey = response._id + "_session@" + Date.now();    
    let sessionId = await utilities.encryptSession(sessionKey);    
    response.sessionId = sessionId;
    sessionId = response._id + "_admin_session@" + sessionId;
    if (!redisClient.isReady) {
        await redisClient.connect();
    }
    let existingSession = await redisClient.get(response._id + "_admin_session");
    if (existingSession) {
        let existingSessionData = JSON.parse(existingSession);
        existingSessionData.sessionId = null;
        await redisClient.set(
            response._id + "_admin_session",
            JSON.stringify(existingSessionData)
        );
    }
    await redisClient.set(
        response._id + "_admin_session", JSON.stringify(response)
    );
    await adminBA.updateAdminFcmTokenBA(response._id, sessionId);
    response.sessionId = sessionId;
    return response;
};

module.exports = new authentication();