const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');
const DB ='mongodb://localhost:27017/pin';
// const DB = 'mongodb+srv://raomubasher5555:Rao3937!@cluster0.07tu9yq.mongodb.net/pin?retryWrites=true&w=majority&appName=Cluster0'
// const mongoURI = process.env.MONGODB_URI;
console.log(DB);
mongoose.connect(DB)
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