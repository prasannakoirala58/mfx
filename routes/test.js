const express = require('express');
const router = express.Router();
const { cloudinary_upload } = require('../helper/imageUploader');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'accomod-8',
  api_key: '776914488651768',
  api_secret: 'bVTgT8OY4S8wM6drl6OH-dAn_RI',
});

router.post('/test-cloudinary-upload', async (req, res) => {
  try {
    // Extract necessary data from the request
    const { poster, banner } = req.body;

    // Call Cloudinary upload function
    const uploadedFileUrl = await cloudinary.uploader.upload(
      'https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg',
      { public_id: 'olympic_flag' },
      function (error, result) {
        console.log(result);
        console.log(error);
      }
    );

    // Send the Cloudinary response back to the client
    res.json({ uploadedFileUrl });
  } catch (error) {
    console.error('Error during Cloudinary upload:', error);
    res.status(500).json({ error: 'Cloudinary upload failed' });
  }
});

module.exports = router;
