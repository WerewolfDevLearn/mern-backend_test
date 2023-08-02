const multer = require('multer');
const path = require('path');

// const tempDir = path.join(__dirname, '..', 'temp');
const tempDir = path.resolve('temp');
const avatarSize = 1048576;
console.log('tempDir: ', tempDir);
const multerConfig = multer.diskStorage({
  destination: tempDir,

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: { fileSize: avatarSize },
});

const upload = multer({ storage: multerConfig });

module.exports = upload;
