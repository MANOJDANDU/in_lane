"use strict";
const nodemailer = require("nodemailer");
const emailTemplets = require("./emailTemplate");

class Email {
    async setUpSmtp() {
        var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: true,
        dkim: {
            domainName: ".com",
            keySelector: "google",
            privateKey:
            "-----BEGIN RSA PRIVATE KEY----- \nMIIEpAIBAAKCAQEAo9WPrQMx+RF161aJLFDgds9qvSD42ocXNBlo/ih2hNP6MhKOlH/n66zehPc6KpNXiTu8XMzjvabGz8fsZaY3QZoQAZbbXVWM2w3EdoPsfiSxjIqy+D+DafSsBAFJX5S7+4NYkoldbbErpBp1IkL/rA2BGTSrDIviwZjppfVM131AIjBh" +
            "HV7bRxA+iQUBQLdv5p5LeaQWFXYS06iFMWE7IRU+7kVc8L8dStdTTPQdT+xWJ7eZ" +
            "OoL/Gt/MMUAM0Jk7g1U/QFSN/y48gxBSamcxYLndQMrxj1cVzqJvEBSGgbjBrh/T" +
            "EDIeOsZtJZzHeVIIj/i91hZVgA8cu1LfrSMuywIDAQABAoIBAAX/7CMJ2uqkGQ1l" +
            "PeDBlXbEYcRLUNGv4MmnpJCqKqzyllb/FvmZNYUL75ou85JbkvkTlvJPDogDc4Ro" +
            "bd/LFnrwiWWFgMMKPv5Goss0SZTVAyuCaMtuiAF5VFNROL6nU7sCNFwpa6J4uoBn" +
            "96IpkfNbCz9BDoKHHOa6EtRhB09c18QTcFtJdL4Vq1TVMf4WMK79jb6fqFCNwa8C" +
            "HEZbzJxInroka8nH4KOoQbv4+tvNJhrHoJ1ZVPwElLOCoFqQFv8P5f54t9g9vS1W" +
            "8Z3uW4dAhAnS69Hcg1gJocZM4Y7DeZVs8rv/BMvX2skv4uIxEZH4P5rvAEkFUlKU" +
            "7SNbWQECgYEA5TjXL0k6BY3O7T3sRW23I/Osw1u1y+MS6PMAwwWPMc/cWpT2lwOK" +
            "JYieN+2WObbp0Nx2WczcFXYaQ964ps2BITsipaVKLO4A0OZFN5K5YdyUViGLm9dY" +
            "cfzTPC5ZqvhRypGDoi1nmDpuIMkEioauo3152N3sYUvxjWS72VGqx18CgYEAtvk4" +
            "S5CJhmmjTMKB0akrGDJHNprLapnYr1e3nyJtBr+Y/1xint10tazLTh8TxhMJJN/6" +
            "DxxgsMDDv8eB3cdQQaA1eVpTF5P+wy1rpJAAbaNJ3sQNPVC0srG0jVeiIESZRmAu" +
            "GAnbgW3txyFt/ZRZm1yKrE9aQCXdNAq5MCPzrBUCgYBofoT6NXOR3JecZ0IyVFXM" +
            "ueTkGgbCL34LW9vZC8u/dXaKhKX1KdPsUF9wN4roPI5SfG4nedBKqFBI6FtdDwny" +
            "0DZ3NOafnNAaax7aurRv/FJTAW/XV1Amho71PFv8KL+AjN1pLTGwn9Jcd8buL3+l" +
            "YCoPxvtfT3OKdYV9CFHGGQKBgQCllHSwVTVO8Mv5i8+FFyzLcbxmGsDYUC75xkyB" +
            "8tptD/f5pvYMQ+X4/kzg/libl+BfgVy+TfTmHxtFstrAAz2KlduuXOHy5VfX8oOF" +
            "4Vax4OHZeNtuUFmlmBEHE3XA87MtL56m3EzLHNrfqE3r+1L3uFA5zHmksV8zWDzr" +
            "5qz9XQKBgQCckOoTW+HTXOWUPCD32ETGBcQij3hD9Z9moM6FgKpKNa9kL3R/erEF" +
            "p8J8ACLYcLpJmimldnnEFXitP1TgX3LqHmBAOWqW7YEuKkvfiptNrwg39Ua1oQXO" +
            "jUSMmY3MmaK1qFlN5/ATwI+iSP2Fl0/56n4s3aWcmSdSSiScQdjPsg==" +
            "-----END RSA PRIVATE KEY-----",
        },
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });
    return transporter;
    };

    async userWelcomeMail(emailId, userId, name) {
        try {
            let info = await this.setUpSmtp();
            info.sendMail({
                from: process.env.MAIL_USER,
                to: emailId,
                subject: "Welcome to LANE FAMILY !!! 🤝 ",
                text: "Hy Dear "+name+",\n ",
                html: (await emailTemplets.userWelcomeMail(userId, name)
                ).toString(),
            }).then(() => {
                console.log("Email sent");
            }).catch((error) => {
                console.error(error);
            });
        } catch (e) {
            console.error("Internal error ", e);
        }
    };

    async userRegMailAdmin(userId, name, email, phone) {
        try {
            let info = await this.setUpSmtp();
            info.sendMail({
                from: process.env.MAIL_USER,
                to: process.env.EMAIL,
                subject: "Welcome to LANE FAMILY !!! 🤝 ",
                text: "Hy Dear Admin",
                html: (await emailTemplets.userRegMailAdmin(userId, name, email, phone)
                ).toString(),
            }).then(() => {
                console.log("Email sent");
            }).catch((error) => {
                console.error(error);
            });
        } catch (e) {
            console.error("Internal error ", e);
        }
    };

    async userApprovedMail(email, userId, name) {
        try {
            let info = await this.setUpSmtp();
            info.sendMail({
                from: process.env.MAIL_USER,
                to: email,
                subject: "Update on Lane Verification",
                text: "Hy Dear "+name+",\n ",
                html: (await emailTemplets.userApprovedMail(userId, name)
                ).toString(),
            }).then(() => {
                console.log("Email sent");
            }).catch((error) => {
                console.error(error);
            });
        } catch (e) {
            console.error("Internal error ", e);
        }
    };

    async userRejectMail(email, userId, name) {
        try {
            let info = await this.setUpSmtp();
            info.sendMail({
                from: process.env.MAIL_USER,
                to: email,
                subject: "Update on Lane Verification",
                text: "Hy Dear "+name+",\n ",
                html: (await emailTemplets.userRejectMail(userId, name)
                ).toString(),
            }).then(() => {
                console.log("Email sent");
            }).catch((error) => {
                console.error(error);
            });
        } catch (e) {
            console.error("Internal error ", e);
        }
    };
}

module.exports = new Email();