const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
require('dotenv').config();
// mongoose.connect('mongodb://localhost:27017/pin');
// const DB = 'mongodb+srv://raomubasher5555:Rao3937!@cluster0.07tu9yq.mongodb.net/pin?retryWrites=true&w=majority&appName=Cluster0'

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


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