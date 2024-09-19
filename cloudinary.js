const cloudinary = require("cloudinary");

// Configuration
cloudinary.config({
  cloud_name: "",
  api_key: "",
  api_secret: "", // Click 'View API Keys' above to copy your API secret
});

// Upload an image
const uploader = async (path) => {
  try {
    const result = await cloudinary.uploader.upload(path);
    return result;
  } catch (error) {
    console.error(error);
  }
};

module.exports = uploader;
