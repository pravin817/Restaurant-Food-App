const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Successfully connected with database ${mongoose.connection.host}`.bgGreen
    );
  } catch (error) {
    console.log(`Error occurs while connecting with database. ${error}`.bgRed);
  }
};

module.exports = connectDB;
