const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

// post middleware
fileSchema.post("save", async function (doc) {
  try {
    console.log(doc);

    // transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send mail here
    let info = await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: doc.email,
      subject: "File Uploaded Successfully",
      text: `Hello ${doc.name}, Your file has been uploaded successfully. You can view it here ${doc.imageUrl}`,
    });
  } catch (error) {
    console.error(error.message);
    console.log(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
