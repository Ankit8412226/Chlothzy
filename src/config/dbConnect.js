// config/dbConnect.js

const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
  try {
    // Use the MongoDB URI from the .env file
    const conn = await mongoose.connect(process.env.DB_URL);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection error: ${error.message}`);
    process.exit(1); // Exit the process with failure if the connection fails
  }
};

module.exports = dbConnect;
