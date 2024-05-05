const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost:27017/pin');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  profileImage: String,
  name: String,
  boards: { type: Array, default: [] },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "post"
    },
  ],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }]
});

userSchema.plugin(plm);





module.exports = mongoose.model('users', userSchema);