const cloudinary = require('cloudinary');
const sharp = require('sharp');

const asyncHandler = require('../middlewares/asyncHandler');

// Helper function to upload file to Cloudinary (for registering user)
const uploadToCloudinary = asyncHandler(async (dataUri, folder, publicId) => {
  try {
    const uploadResult = await cloudinary.v2.uploader.upload(dataUri, {
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
const cloudinaryUploadHandler = async (file, folder, publicId, banner = true) => {
  // Image manipulation
  if (banner) {
    // banner_image=944 * 472
    file[0].buffer = await sharp(file[0].buffer)
      .resize({ height: 472, width: 944, fit: 'contain' })
      .toBuffer();
  } else {
    // poster_image = 261 * 392 ;
    file[0].buffer = await sharp(file[0].buffer)
      .resize({ height: 392, width: 261, fit: 'contain' })
      .toBuffer();
  }

  console.log('Chalyo ta ya samma?');

  // Convert the file buffer to base64 encoded dataURI
  const mimeType = file[0].mimetype; // Get the mime type
  const buffer = file[0].buffer; // Get the file buffer
  const base64String = Buffer.from(buffer).toString('base64', 'binary');
  const dataUri = `data:${mimeType};base64,${base64String}`;

  const uploadedFileUrl = await uploadToCloudinary(dataUri, folder, publicId);
  console.log('Uploaded file to cloudinary:', uploadedFileUrl);
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
const cloudinaryDeleteHandler = async (fileSecureUrl) => {
  const publicId = getPublicIdFromUrl(fileSecureUrl);
  const deletionResult = await cloudinary.v2.uploader.destroy(publicId);
  return deletionResult.result === 'ok';
};

module.exports = {
  cloudinaryUploadHandler,
  cloudinaryDeleteHandler,
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
