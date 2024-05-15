const express = require("express");
const router = express.Router();

// import the controller
const {
  imageUpload,
  videoUpload,
  localFileUpload,
  imageSizeReducer,
} = require("../controller/fileUpLoad");

// api route
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);

module.exports = router;
