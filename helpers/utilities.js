let sha1 = require("sha1");

exports.encryptSession = async (session) => {
    return await sha1(session);
};
