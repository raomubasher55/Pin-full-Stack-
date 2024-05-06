const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

// mongoose.connect('mongodb://localhost:27017/pin');
const DB = 'mongodb+srv://raomubasher5555:Rao3937!@cluster0.07tu9yq.mongodb.net/pin?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(DB ).then(()=>{
  console.log("connection was successfully ");
}).catch(()=>{
  console.log("not connection");
})  

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