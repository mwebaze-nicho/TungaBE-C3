const express = require("express");
const uploader = require("./cloudinary");
const upload = require("./multer");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.json());

/*
 * Route to handle file upload i.e api/uploads
 * We are uploading a single file with a key of image. If the key is different from image it will not work as multer will fail to recognize it.
 * For a single file upload multer give  us a req.file which allows us to access the uploaded file and req.files for multiple files.
 * Once we have uploaded the file we extract the path and use it to upload the file to cloudinary and then delete it with fs from the disk storage.
 */
app.post("/api/uploads", upload.single("image"), async (req, res) => {
  //access the file from multer
  const file = req.file;
  try {
    if (!file) {
      res.status(400).json({ message: "No file uploaded." });
      return;
    }
    //extract path from the file
    const { path } = file;

    //upload the file to cloudinary
    const result = await uploader(path);

    res
      .status(200)
      .json({ message: "File uploaded successfully!", data: result });

    fs.unlinkSync(path);
    
  } catch (error) {
    res.status(500).send("File upload failed.");
  }
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
