const adminDA = require('../datalayer/adminDA');

const adminBussinessLayer ={

    async adminIsExistBA(email, username, phoneNumber){
        return await adminDA.adminIsExistDA(email, username, phoneNumber);
    },

    async addAdminBA(body){
        return await adminDA.addAdminDA(body);
    },
    
    async adminExistBA(username){
        return await adminDA.adminExistDA(username);
    },

    async updateAdminFcmTokenBA(_id, sessionId){
        return await adminDA.updateAdminFcmTokenDA(_id, sessionId)
    },

    async userListBA(name, startDate, endDate){
        return await adminDA.userListDA(name, startDate, endDate)
    },

    async changeUserStatusBA(_id, isVerified, verifiedBy, notes){
        return await adminDA.changeUserStatusDA(_id, isVerified, verifiedBy, notes)
    }

}

module.exports = adminBussinessLayer;