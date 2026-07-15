// backend/models/User.js
// ─────────────────────────────────────────────
// User model schema definition with bio and location support
// ─────────────────────────────────────────────

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name:      { type: String, required: true },
  email:     { type: String, required: true, unique: true, lowercase: true },
  password:  { type: String, required: true },  // hashed
  bio:       { type: String, default: '' },
  location:  { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
