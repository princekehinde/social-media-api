const User = require('../models/User');
const bcrypt = require('bcrypt')

// register
exports.regUser = async (req, res) => {
try {
    // generate a new password hash
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const newUser =  new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
      desc: req.body.desc,
      city: req.body.city,
      from: req.body.from,
    });
    
    // save the user
    const user = await newUser.save();
    res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};

// login
    exports.loginUser = async (req, res) => {
        try {
          const user = await User.findOne({ email: req.body.email });
          !user && res.status(404).json("user not found");
      
          const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
          );
          !validPassword && res.status(400).json("wrong password");
      
          res.status(200).json(user);
        } catch (error) {
          res.status(500).json(error)
        }
      };