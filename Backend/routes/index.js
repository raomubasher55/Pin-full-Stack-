var express = require('express');
var router = express.Router();
const userModel = require('./users');
const postModel = require('./post');
const passport = require('passport');
const localStrategy = require('passport-local');
const { body, query, matchedData, validationResult } = require('express-validator');
const upload = require('./multer');
const users = require('./users');
passport.use(new localStrategy(userModel.authenticate()))

//homepage
router.get('/' , async (req, res )=>{
  const posts = await postModel.find().populate('user');
  res.send(posts);
}
)

/* GET profile page. */
router.get('/profile', isLoggedIn, async (req, res, next) => {
  try {
    // Retrieve user data
    const user = await userModel.findOne({ username: req.user.username }).populate('posts');
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//signup
router.post('/signup', 
[
  body('name').notEmpty().withMessage('Name is required').isLength({ min: 3 }),
  body('username').notEmpty().withMessage('Username is required').isLength({ min: 3 }).withMessage("Enter Username more than 3 character"),
  body('email').isEmail().withMessage('Invalid email address'),
  body('password').notEmpty().withMessage("Password is required").isLength({ min: 5 }).withMessage("Enter Password more than 5 character")
], async function (req, res, next) {
  try {
    // Validate input data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if user already exists
    let existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: "User already registered" });
    }

    // Create a new user  
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      name: req.body.name
    });

    // Save the new user
    const savedUser = await userModel.register(newUser, req.body.password);

    // Log in the user after successful registration      session me store krne k lie
    req.login(savedUser, function(err) {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server error");
      }
      // Store user information in the session
      req.session.user = savedUser;
      res.status(201).json({ success: true, message: "User registered successfully.", user: savedUser });
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});



// Login 
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(404).json({ success: false, message: "Enter Correct Username or Password" });
    }
  

    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Internal server error" });
      }
      // Set the authenticated user in the session
      req.session.user = user;
      // Send a success response upon successful login
      return res.status(200).json({ success: true, message: "Logged in successfully", user });
    });
  })(req, res, next);
});


// Logout route
router.post('/logout',isLoggedIn ,function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).send({success: true , message: "Logout successfully"})
  });
});



// router.post('/createpin', isLoggedIn, upload.single('file'), async (req, res, next) => {
//   try {
//       const user = await userModel.findOne({ username: req.session.passport.user });
//       if (!req.file) {
//           return res.status(404).send("File not found");
//       }
//       const post = new postModel({
//           user: user._id,
//           image: req.file.filename,
//           title: req.body.title,
//           description: req.body.description,
//       });
//       const savedPost = await post.save();
//       user.posts.push(savedPost._id);
//       await user.save();
//       res.status(200).json(savedPost);
//   } catch (error) {
//       console.error(error.message);
//       res.status(500).send("Internal Server Error");
//   }
// });  

//createpin
router.post('/createpin', isLoggedIn, upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(404).json({ success: false, message: "please Upload a file" })
    } else {
      const user = await userModel.findOne({ username: req.session.passport.user });
      const post = new postModel({
        user: user._id,
        title: req.body.title,
        image: req.file.filename,
        description: req.body.description,
      });
      const savedPost = await post.save();
      user.posts.push(savedPost._id);
      await user.save();
      res.json({success: true ,savedPost});
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//update pin
router.put('/updatepin/:id', isLoggedIn, upload.single('file'), async (req, res, next) => {
  const { title, description } = req.body;
  const image = req.file ? req.file.filename : null;

  let newPin = {};
  if (title) { newPin.title = title; }
  if (description) { newPin.description = description; }
  if (image) { newPin.image = image; }

  try {
    // Find the post by its ID
    let pin = await postModel.findById(req.params.id);
    if (!pin) {
      return res.status(404).send({ success: false, message: "Post not Found" });
    }

    // Check if the user making the request is the owner of the post
    if (pin.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Update the records
    pin = await postModel.findByIdAndUpdate(req.params.id, { $set: newPin }, { new: true });
    res.json({pin});
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//delete Pin
router.delete('/deletepin/:id', isLoggedIn, async (req, res, next) => {


  try {
    // Find the post by its ID
    const user = await userModel.findOne({ username: req.user.username });
    console.log(user);
    let pin = await postModel.findById(req.params.id);
    if (!pin) {
      return res.status(404).send("Post not Found");
    }

    // Check if the user making the request is the owner of the post
    if (pin.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    // Update the records
    pin = await postModel.findByIdAndDelete(req.params.id);
    user.posts = user.posts.filter((postId) => postId.toString() !== req.params.id)

    await user.save();
    res.json({ success: "Pin is delete successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//update Profileimage
router.put('/updateprofileimage/:id', isLoggedIn, upload.single('file'), async (req, res, next) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    const newProfileImage = req.file ? req.file.filename : null;

    // Update the user's profile image
    user.profileImage = newProfileImage;
    await user.save();

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


//follow
router.post('/follow/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const currentUser = await userModel.findOne({ username: req.session.passport.user });

    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    if(currentUser._id.toString() === req.params.userId){
      return res.status(403).json({message: "Not Allowed"});
    }
    const targetUser = await userModel.findById(req.params.userId);
    
    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    if (currentUser.following.includes(targetUser._id)) {
      return res.status(400).json({ message: "Already following this user" });
    }

    
    const followUser = async (user, target) => {
      user.following.push(target._id);
      await user.save();
    };
    
    await followUser(currentUser, targetUser);
    targetUser.followers.push(currentUser._id);
    await targetUser.save();
    

    res.status(200).json({ message: "Successfully followed user" , result: targetUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}); 

//unfollow
router.post('/unfollow/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const currentUser = await userModel.findOne({ username: req.session.passport.user });
    if (!currentUser) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const targetUser = await userModel.findById(req.params.userId);
    if (!targetUser) {
      return res.status(404).json({ message: "Target user not found" });
    }
    
    if (!currentUser.following.includes(targetUser._id)) {
      return res.status(403).json({ message: "Not Allowed" });
    }
    
    const unfollowUser = async (user, target) => {
      if (user.following.includes(target._id)) {
        user.following.remove(target._id);
        await user.save();
      }
    };

    await unfollowUser(currentUser, targetUser);
    targetUser.followers.remove(currentUser._id);
    await targetUser.save();
    
    res.status(200).json({ message: "Successfully unfollowed user" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//find user
router.get ('/find',  async (req, res, next) => {
  try {
    const regex = new RegExp(req.query.searchuser, 'i');
    
    let users = await userModel.find({ username: regex }).populate('posts');;
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// find pins
router.get('/findpin', async (req, res, next) => {
  try {
    const { search } = req.query; // Use req.query to get the search query from the URL
    
    const regex = new RegExp(search, 'i');
    let posts = await postModel.find({ title: { $regex: regex } });
    res.send(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error");
  }
});


//TODO if application expend
//update Profile
router.put('/updateprofile/:id', isLoggedIn, upload.single('file'), async (req, res, next) => {
  try {
    let user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    const newProfileImage = req.file ? req.file.filename : null;
    const { name, password, email } = req.body;

    // Update the user's profile image 
    user.profileImage = newProfileImage;
    user.name = name;
    user.password = password;

    if (email && email !== user.email) {
      const checkEmail = await userModel.findOne({ email: req.body.email })
      if (checkEmail) {
        res.status(400).send("Email already exist");
      }
      user.email = email;
    }
    await user.save();

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//login middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next(); 
  }
  res.status(401).json({ success: false, message: "Unauthorized , First  Login" });
}

module.exports = router;
