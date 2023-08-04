const { ctrlWrapper } = require('../../decorators');

const getCurrent = ctrlWrapper(async (req, res) => {
  const currentUser = req.user;
  res.status(200).json({
    token: currentUser.token,
    user: {
      name: currentUser.name,
      email: currentUser.email,
      avatarUrl: currentUser.avatarUrl,
      verifiedEmail: currentUser.verifiedEmail,
    },
  });
});

module.exports = getCurrent;
