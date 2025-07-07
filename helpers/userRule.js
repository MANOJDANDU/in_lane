const Joi = require("joi");

exports.userForm = Joi.object({
    fullname: Joi.string().required().error(new Error("Name is required")),
    phoneNumber: Joi.number().required().error(new Error("Phone Number is required")),
    email: Joi.string().required().error(new Error("Email is required")),
    dob: Joi.date().required().error(new Error("dob is required")),
    address: Joi.string().error(new Error("Address is required")),
});