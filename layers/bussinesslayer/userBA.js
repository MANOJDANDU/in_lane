const userDA = require('../datalayer/userDA');

const userBussinessLayer ={

    async userFormBA(body, aadhaar, photograph, signature){
        return await userDA.userFormDA(body, aadhaar, photograph, signature);
    },

    async checkUserBA(phoneNumber, email){
        return await userDA.checkUserDA(phoneNumber, email);
    }

}

module.exports = userBussinessLayer;