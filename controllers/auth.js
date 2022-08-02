const User = require('../models/User');

exports.regUser = async (req, res) => {
try {
    const newUser =  new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      desc: req.body.desc,
      city: req.body.city,
      from: req.body.from,
    });

    const user = await newUser.save();
    res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
};
    // module.exports = router;