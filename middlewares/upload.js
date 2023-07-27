const multer = require('multer');
const path = require('path');

const tempDir = path.join(__dirname, '../', 'temp');
const avatarSize = 1048576;

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const uniquePreffixs = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const { originalname } = file;
    const fileName = `${uniquePreffixs}_${originalname}`;
    cb(null, fileName);
  },
  limits: {
    fileSize: avatarSize,
  },
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
