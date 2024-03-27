const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body, validationResult } = require('express-validator');
var jwt = require('jsonwebtoken');
var Fetchuser=require('../middleware/Fetchuser');
const JWT_SECRET = 'AJISGOODBOY';

// ROUTE-1 Create a user using POST "/api/auth/createuser", doesn't require authentication
router.post('/createuser', [
  // Validation middleware for the request body
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  // Check for validation errors in the request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }

  try {
    // Check if the user with the provided email already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ success, error: 'Email already exists' });
    }

    // Generate a salt and hash the user's password asynchronously
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user with the hashed password
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    });

    const data = {
      user: {
        id: user.id
      }
    };
    
    // Sign the JWT and send the response
    try {
      const authtoken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authtoken, user: { id: user.id, name: user.name, email: user.email } });
    } catch (error) {
      console.error('Error signing JWT:', error);
      res.status(500).send('Internal Server error occurred');
    }
  } catch (error) {
    // Log and handle any unexpected errors
    console.error(error.message);
    res.status(500).send('Internal Server error occurred');
  }
});



// ROUTE2 :-authenticate a user using POST "/api/auth/login", doesn't require login
router.post('/login', [
  // Validation middleware for the request body
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success=false;
  // if there are errors return bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success=false;
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }

    const data = {
      user: {
        id: user.id
      }
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({ success,authtoken });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occurred");
  }
});


// ROUTE3 :-Get logging User Details using: POST "/api/auth/getuser",  require login
router.post('/getuser',Fetchuser , async (req, res) => {   
try {
    userId=req.user.id;
    const user= await User.findById(userId).select("-password")
    res.send(user)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server error occurred");
   }
  })
module.exports = router;




