const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// handle uncaught error
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Server shutting down due to unhandle promise Rejection");
  process.exit(1);
});
// config
dotenv.config({ path: "backend/config/config.env" });
//connect database
connectDatabase();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhandle promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log("Server shutting down due to unhandle promise Rejection");
  server.close(() => {
    process.exit(1);
  });
});
