const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, validate: { validator: value => /\S+@\S+\.\S+/.test(value), message: 'Email không hợp lệ' } },
  password: { type: String, required: true },
  googleId: { type: String },
  facebookId: { type: String },
  displayName: { type: String },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Thêm middleware để hash mật khẩu trước khi lưu vào cơ sở dữ liệu
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

// Thêm trường thời gian cập nhật khi thay đổi thông tin
userSchema.pre('findOneAndUpdate', function (next) {
  this.set({ updatedAt: new Date() });
  return next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
