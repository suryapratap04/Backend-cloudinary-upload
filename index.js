// app creation
const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000;
app.use(express.json());

// file upload the files on server while cloudinary on the media server
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// database connection
const connectDB = require("./config/database");
connectDB();

// connecting to the cloudinary
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route mounting
const Upload = require("./routes/fileUpload");
app.use("/api/v1/upload", Upload);

// activate server
app.listen(PORT, () => {
  console.log(`App is listening on the port ${PORT}`);
});

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the cloudinary file upload api",
  });
});
