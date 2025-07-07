const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const userController = require('../controller/user');
const s3 = require("../helpers/s3");
const { FileLimit } = require("../helpers/constants");

const fileFilter = (req, file, cb) => {
    if (["aadhaar", "photograph", "signature"].includes(file.fieldname)) {
        if (!FileLimit.ALLOWED_TYPES.includes(file.mimetype)) {
            return cb(new Error("Only JPEG, PNG, PDF are allowed"), false);
        }
        cb(null, true);
    }
};

const uploadDocuments = multer({
    storage: multerS3({
        s3: s3,
        bucket: "inlanes",
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const folders = {
                aadhaar: "aadhaar",
                photograph: "photograph",
                signature: "signature"
            };
            const folder = folders[file.fieldname] || "other";
            cb(null, `${folder}/${Date.now()}_${file.originalname}`);
        },
        contentType: multerS3.AUTO_CONTENT_TYPE,
    }),
    fileFilter: (req, file, cb) => {
        fileFilter(req, file, cb);
    },
}).fields([
    { name: "aadhaar", maxCount: 1 },
    { name: "photograph", maxCount: 1 },
    { name: "signature", maxCount: 1 },
]);

const checkFileSize = (req, res, next) => {
    if (req.files) {
        for (let field of ["aadhaar", "photograph", "signature"]) {
            if (req.files[field]) {
                for (let file of req.files[field]) {
                    if (file.size > FileLimit.FILE_LIMIT) {
                        return res.status(400).json({ error: `${file.fieldname} file size should not exceed 2MB` });
                    }
                }
            }
        }
    }
    next();
};

router.post('/form',
    uploadDocuments, checkFileSize,
    userController.userForm
);

module.exports = router;