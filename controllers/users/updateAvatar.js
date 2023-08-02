const User = require('../../models/user');
const { ctrlWrapper } = require('../../decorators');
const { cloudinary, HttpError } = require('../../utils');

const updateAvatar = ctrlWrapper(async (req, res) => {
  const { avatarId } = req.user;
  console.log(avatarId);
  if (avatarId) await cloudinary.destroy(avatarId);
  console.log(req.file);
  // eslint-disable-next-line camelcase
  const { url, public_id } = await cloudinary.upload(req.file.path);
  const avatar = { avatarUrl: url, avatarId: public_id };
  const newUser = await User.findByIdAndUpdate(req.user._id, avatar);
  if (!newUser) throw HttpError(404);
  res.status(200).json({ avatar: url });
});

module.exports = updateAvatar;
