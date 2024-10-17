const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const user = await User.findOne({ email });
    if (user) throw new Error('이미 가입이 된 유저입니다.');

    const newUser = new User({
      email,
      name,
      password: hash,
    });

    await newUser.save();
    res.status(200).json({ status: 'ok', data: newUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

module.exports = userController;
