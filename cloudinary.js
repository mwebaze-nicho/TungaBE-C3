const cloudinary = require("cloudinary");

// Configuration
cloudinary.config({
  cloud_name: "dexwmv2n8",
  api_key: "724638491265128",
  api_secret: "pOAtW-L2VIlO5UipfGLdoKKmJDQ", // Click 'View API Keys' above to copy your API secret
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
