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
    if (user) {
      return res.status(409).json({
        status: 'fail',
        message: '이미 가입된 유저입니다',
      });
    }

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

userController.loginEmail = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }, '-createdAt -updatedAt -__v');
    if (user) {
      const isMatch = bcrypt.compareSync(password, user.password);
      if (isMatch) {
        const token = user.generateToken();
        return res.status(200).json({ status: 'ok', user, token });
      } else {
        return res.status(401).json({
          status: 'fail',
          message: '아이디 또는 비밀번호가 일치하지 않습니다',
        });
      }
    } else {
      return res.status(404).json({
        status: 'fail',
        message: '가입된 유저가 아닙니다',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: 'fail', error });
  }
};

module.exports = userController;
