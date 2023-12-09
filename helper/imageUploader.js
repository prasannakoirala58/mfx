const cloudinary = require('cloudinary');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const asyncHandler = require('../middlewares/asyncHandler');

// Helper function to create temporary file on disk (for registering user)
const createTempFile = (fileBuffer, fileName) => {
  const tempFilePath = path.join(__dirname, fileName);
  fs.writeFileSync(tempFilePath, fileBuffer);
  return tempFilePath;
};

// Helper function to upload file to Cloudinary (for registering user)
const uploadToCloudinary = asyncHandler(async (filePath, folder, publicId) => {
  console.log('File for cloudinary', filePath);
  console.log('Folder for cloudinary', folder);
  console.log('publicID for cloudinary', publicId);

  try {
    const uploadResult = await cloudinary.v2.uploader.upload(filePath, {
      folder: folder,
      public_id: publicId,
    });
    console.log('Cloudinary upload success', uploadResult);
    return uploadResult.secure_url;
  } catch (err) {
    console.log(err);
  }
});

// Helper function to handle file upload and cleanup (for registering user)
const cloudinary_upload = async (fileBuffer, fileName, folder, publicId, banner = true) => {
  // Image manipulation
  if (banner) {
    // banner_image=944 * 472
    fileBuffer = await sharp(fileBuffer)
      .resize({ height: 472, width: 944, fit: 'contain' })
      .toBuffer();
  } else {
    // poster_image = 261 * 392 ;
    fileBuffer = await sharp(fileBuffer)
      .resize({ height: 392, width: 261, fit: 'contain' })
      .toBuffer();
  }

  console.log(fileBuffer, fileName, folder, publicId, banner);
  console.log('Chalyo ta ya samma?');
  console.log('This is the file buffer', fileBuffer);

  const tempFilePath = createTempFile(fileBuffer, fileName);
  console.log('This is the error root?', tempFilePath);

  const uploadedFileUrl = await uploadToCloudinary(tempFilePath, folder, publicId);
  console.log('Uploaded file to cloudinary:', uploadedFileUrl);
  if (uploadedFileUrl) {
    fs.unlink(tempFilePath, (err) => {
      if (err) {
        console.error(`Error deleting temporary file ${tempFilePath}:`, err);
      }
    });
  }

  return uploadedFileUrl;
};
// For Deleting file from Cloudinary

// Helper function to extract public_id from Cloudinary file URL
const getPublicIdFromUrl = (fileSecureUrl) => {
  const publicId = fileSecureUrl.substring(
    fileSecureUrl.lastIndexOf('/') + 1,
    fileSecureUrl.lastIndexOf('.')
  );
  return publicId;
};

// Helper function to delete file from Cloudinary
const cloudinary_delete = async (fileSecureUrl) => {
  const publicId = getPublicIdFromUrl(fileSecureUrl);
  const deletionResult = await cloudinary.v2.uploader.destroy(publicId);
  return deletionResult.result === 'ok';
};

module.exports = {
  cloudinary_upload,
  cloudinary_delete,
};

// exports.cloudinary_upload = asyncHandler(async (file, folderName, banner = true) => {
//   const imageName = file.name.replace(/\.[^/.]+$/, '') + '-' + Date.now(); // Remove file extension

//   let transform;

//   if (banner) {
//     // Banner image transformation: 944x472, contain mode
//     transform = { width: 944, height: 472, crop: 'contain' };
//   } else {
//     // Poster image transformation: 261x392, contain mode
//     transform = { width: 261, height: 392, crop: 'contain' };
//   }

//   try {
//     const uploadedImage = await cloudinary.v2.uploader
//       .upload_stream(
//         {
//           public_id: `${folderName}/${imageName}`,
//           transformation: [{ ...transform, fetch_format: 'auto' }], // Use 'auto' for automatic format selection
//           format: 'auto', // Use 'auto' for automatic format selection
//           folder: folderName,
//           tags: ['image_upload'],
//         },
//         (error, result) => {
//           if (error) {
//             throw new Error('Cloudinary upload error: ' + error.message);
//           }
//           return result;
//         }
//       )
//       .end(file.data);

//     return uploadedImage.secure_url;
//   } catch (error) {
//     // Delete the uploaded file on Cloudinary in case of an error
//     await cloudinary.uploader.destroy(`${folderName}/${imageName}`);

//     // Re-throw the error after attempting to delete the file
//     throw error;
//   }
// });

// exports.s3_upload = asyncHandler(async (file, folderName, banner = true) => {
//   const imageName = file.name + '-' + Date.now();

//   let buffer;

//   if (banner) {
//     // banner_image=944 * 472
//     buffer = await sharp(file.data)
//       .resize({ height: 472, width: 944, fit: 'contain' })
//       .toBuffer();
//   } else {
//     // poster_image = 261 * 392 ;
//     buffer = await sharp(file.data)
//       .resize({ height: 392, width: 261, fit: 'contain' })
//       .toBuffer();
//   }

//   const params = {
//     Bucket: bucketName,
//     Key: `${folderName}/${imageName}`,
//     Body: buffer,
//     ContentType: file.mimetype,
//   };

//   const uploadedImage = await s3.upload(params).promise();

//   return uploadedImage.Location;
// });
