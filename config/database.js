const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Databse Connection Successfully ");
    })
    .catch((error) => {
      console.log(`Error during DB connection ${error.message}`);
      process.exit(1);
    });
};
module.exports = connectDB;
