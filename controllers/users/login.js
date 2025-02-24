const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError } = require('../../utils');
const { SECRET_KEY } = process.env;

const login = ctrlWrapper(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401);
  if (!user.verifiedEmail) throw HttpError(401);
  const isMatch = bcrypt.compare(password, user.password);
  if (!isMatch) throw HttpError(401);
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  const returnedUser = await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      name: returnedUser.name,
      email: returnedUser.email,
      avatarUrl: returnedUser.avatarUrl,
      verifiedEmail: returnedUser.verifiedEmail,
    },
  });
});

module.exports = login;
