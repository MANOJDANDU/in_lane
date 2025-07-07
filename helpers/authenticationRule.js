const Joi = require("joi");

exports.addAdminRule = Joi.object({
    name: Joi.string().required().error(new Error("name is required")),
    email: Joi.string().required().error(new Error("email is required")),
    username: Joi.string().required().error(new Error("username is required")),
    phoneNumber: Joi.number().required().error(new Error("phoneNumber is required")),
    password: Joi.string().required().error(new Error("password is required")),
    dob: Joi.string().required().error(new Error("dob is required")),
    registeredBy: Joi.string().empty("").allow(null),
    gender: Joi.string().required().error(new Error("Gender is required")),
});
