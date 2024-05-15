const cloudinary = require("cloudinary").v2;
const File = require("../models/file");

exports.localFileUpload = async (request, response) => {
  try {
    // fetch the file
    const file = request.files.file;
    console.log("file came ", file);
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("path is ", path);
    file.mv(path, (error) => {
      console.log(`Error  Occured While Uploading File ${error}`);
    });

    response.json({
      success: true,
      msg: "File Uploaded Successfully",
    });
  } catch (error) {
    console.error(error);
    console.log(`Error in the uploading `);
  }
};

function validFileType(type, supportedType) {
  return supportedType.includes(type);
}

async function uploadToCloudinary(file, folder, quality = 100) {
  try {
    const options = { folder };
    options.resource_type = "auto";
    
    // quality is only for image size reducer
    options.quality = quality;
    console.log("file path is ", file.tempFilePath, options);
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
  } catch (error) {
    console.log(error.message);
    console.error("Error uploading to Cloudinary:", error);
  }
}

exports.imageUpload = async (request, response) => {
  try {
    //fetch the data from the request
    const { name, email, tags } = request.body;
    console.log(name, email, tags);

    //fetch the file
    const file = request.files.imageFile;
    console.log("file came ", file);

    // validation of the file
    const supportedType = ["png", "jpeg", "jpg"];
    const fileType = file.name.split(".")[1];
    console.log("file type is ", fileType);

    // file type is not supported
    if (!validFileType(fileType, supportedType)) {
      return response.status(400).json({
        success: false,
        msg: "File Type is not supported",
      });
    }

    //when file type is supported

    const res = await uploadToCloudinary(file, "sampleUpload");

    console.log(res);

    // save the file details to the database
    const fileData = await File.create({
      name,
      imageUrl: res.secure_url,
      tags,
      email,
    });
    console.log(fileData);
    response.status(200).json({
      success: true,
      fileData,
      message: "File Uploaded Successfully",
    });
  } catch (error) {
    console.error(error.message);
    console.log(error);
    console.log(`Error in the uploading `);
  }
};

// viodeo upload function
exports.videoUpload = async (request, response) => {
  try {
    const { name, email, tags } = request.body;
    const file = request.files.videoFile;

    console.log("file came ", file);
    const supportedType = ["mp4", "avi", "mov"];

    const fileType = file.name.split(".")[1];
    console.log("file type is ", fileType);

    if (!validFileType(fileType, supportedType)) {
      return response.status(400).json({
        success: false,
        msg: "File Type is not supported",
      });
    }

    const res = await uploadToCloudinary(file, "sampleUpload");

    console.log(res);
    const fileData = await File.create({
      name,
      imageUrl: res.secure_url,
      tags,
      email,
    });
    console.log(fileData);
    response.status(200).json({
      success: true,
      fileData,
      message: "File Uploaded Successfully",
    });
  } catch (error) {
    console.error(error.message);
    console.log(error);
    console.log(`Error in the uploading `);
  }
};

// image size reducer
exports.imageSizeReducer = async (request, response) => {
  try {
    const { name, email, tags } = request.body;
    const file = request.files.imageFile;
    console.log("file came ", file);

    const supportedType = ["png", "jpeg", "jpg"];
    const fileType = file.name.split(".")[1];
    console.log("file type is ", fileType);

    if (!validFileType(fileType, supportedType)) {
      return response.status(400).json({
        success: false,
        msg: "File Type is not supported",
      });
    }

    const res = await uploadToCloudinary(file, "sampleUpload", 90);

    console.log(res);
    const fileData = await File.create({
      name,
      imageUrl: res.secure_url,
      tags,
      email,
    });
    console.log(fileData);
    response.status(200).json({
      success: true,
      fileData,
      message: "File Uploaded Successfully",
    });
  } catch (error) {
    console.error(error.message);
    console.log(error);
    console.log(`Error in the uploading `);
  }
};
