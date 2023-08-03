const multer = require('multer');
const path = require('path');

// const tempDir = path.join(__dirname, '..', 'temp');
const tempDir = path.resolve('temp');
const avatarSize = 1048576;

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    console.log('file: ', file);

    cb(null, file.originalname);
  },
  limits: { fileSize: avatarSize },
});

const upload = multer({ storage: multerConfig });

module.exports = upload;
