const mongoose = require('mongoose');
const Counter = require('./counter');

let user = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, unique:true, required:true },
  phoneNumber: { type: Number, required: true },
  dob: { type: Date, required: true },
  address: { type: String, required: true },
  aadhaar: { type: String, default: null },
  photograph: { type: String, default: null },
  signature: { type: String, default: null },
  isVerified: {type: String, enum: ["PENDING", "APPROVED", "REJECTED"], default: "PENDING", required: true },
  userId: { type: String, default: null },
  notes: { type: String, default: null},
  verifiedBy: { type: String, default: null, ref: "Admin" },
  isActive: { type: Boolean, default: true },
  isCompleted: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  updated: [{
    updatedBy: { type: String, default: null, ref: "Admin" },
    remarks: { type: String, default: null },
    updatedOn: { type: Date, default: null }
  }],
  createdOn: { type: Date , default: Date.now }
});

user.pre('save', async function (next) {
  if (this.isNew && !this.userId) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: 'userId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      const number = counter.seq.toString().padStart(2, '0');
      this.userId = `INLUSR${number}`;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

let admin = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique:true, required:true },
  username: { type: String, unique:true, required:true },
  phoneNumber: { type: Number, required: true },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  adminId: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  fcmToken: { type: String, default: null },
  isCompleted: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  updated: [{
    updatedBy: { type: String, default: null, ref: "Admin" },
    remarks: { type: String, default: null },
    updatedOn: { type: Date, default: null }
  }],
  registeredBy: {type: mongoose.Schema.Types.ObjectId, default: null, ref: "Admin"},
  createdOn: { type: Date , default: Date.now }
});

admin.pre('save', async function (next) {
  if (this.isNew && !this.adminId) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: 'adminId' },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      const number = counter.seq.toString().padStart(2, '0');
      this.adminId = `INLAD${number}`;
      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});

exports.userModel = mongoose.model('User', user);
exports.adminModel = mongoose.model('Admin', admin);