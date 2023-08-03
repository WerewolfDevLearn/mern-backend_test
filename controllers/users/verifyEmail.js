const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { HttpError, sendEmail } = require('../../utils');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const verifyEmail = ctrlWrapper(async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });
  if (!user) throw HttpError(401, 'Email not verified');
  const payload = { id: user._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '23h' });
  const returnedUser = await User.findByIdAndUpdate(user._id, {
    verifiedEmail: true,
    verificationCode: '',
    token,
  });
  res.json({
    token,
    user: {
      name: returnedUser.name,
      email: returnedUser.email,
      avatarUrl: returnedUser.avatarUrl,
    },
  });
  // res.json({ message: `Email ${user.email} verified` });
});

const resendEmail = ctrlWrapper(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw HttpError(401, 'Email not found');
  if (user.verifiedEmail) throw HttpError(400, 'Email already verified');
  await sendEmail(email, user.verificationCode);
  res.json({ message: `Email sent to ${email}` });
});

module.exports = { verifyEmail, resendEmail };
