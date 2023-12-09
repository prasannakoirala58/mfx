const multer = require('multer');
const { CustomError } = require('../utils/customError');

// Create multer storage configuration
const multerStorage = multer.memoryStorage();

// Multer filter for filtering only images
const multerFilter = (req, file, cb) => {
  // console.log(`Yo multer filter ley gareko ho hai: ${JSON.stringify(file)}`);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(CustomError('Not an image! Please upload only images.', 400), false);
  }
};

// upload for multer
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

module.exports = upload;
