const redisClient = require("../config/redisConfig");
const Boom = require("@hapi/boom");

class sessionValidator {
    async validateAdminSession(req, res, next) {
        try {
            const authToken = req.headers["authtoken"];
            if (!authToken) {
                throw Boom.unauthorized('authToken is missing');
            }
            const sessionId = authToken;
            let adminId = getAdminIdFromSessionId(sessionId);
            let extractedSession = getSessionPartFromSessionId(sessionId);
            let sessionData = await redisClient.get(adminId + "_admin_session");
            if (!sessionData) {
                throw Boom.unauthorized("session expired");
            }
            let session = JSON.parse(sessionData);
            let extractedSavedSession = getSessionPartFromSessionId(session.fcmToken);
            if (extractedSavedSession !== extractedSession) {
                throw Boom.unauthorized("session expired");
            }
            req.user = session; 
            next();
        } catch (e) {
            next(e);
        }
    }
}

function getAdminIdFromSessionId(sessionId) {
    let parts = sessionId.split("_admin_session@");
    if (parts.length > 0) {
        return parts[0];
    } else {
        throw new Error("Invalid session ID format");
    }
}

function getSessionPartFromSessionId(sessionId) {
    if (!sessionId) {
        throw new Error("Session ID is undefined or null");
    }
    let parts = sessionId.split("@");
    if (parts.length > 1) {
        return parts[1];
    } else {
        throw new Error("Invalid session ID format");
    }
}

module.exports = new sessionValidator();