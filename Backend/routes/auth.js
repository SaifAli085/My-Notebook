const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const fetchUser = require('../middleware/fetchUser')

const jwt_secret = "thisissecretsign";
// ROUTE 1:  Create a new User
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "password must be at least 8 length").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success, error: "This email is already exists." });
      }
      const salt = await bcrypt.genSalt(10);
      const securePass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({success, authtoken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
  }
);

// ROUTE 2: Authenticate a User
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({success, error: "Email is incorrect" });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({success, error: "Password is incorrect" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, jwt_secret);
      success = true;
      res.json({success, authtoken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("some error occured");
    }
      
    }
  
)
// ROUTE 3: Fetch user data
router.post(
  "/getuser",fetchUser,
  async (req, res) => {
    
    try {
      
      const userId = req.user.id;
      const user = await User.findById(userId).select('-password');
      res.send(user);

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
    }
      
    }
  
)


module.exports = router;
