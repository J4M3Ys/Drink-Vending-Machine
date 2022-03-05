const mongoose = require("mongoose");
const MONGO_URI = "mongodb://admin:admin-secret@localhost:27018/webapi"

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    authSource: "admin",
    appname: "MongoDB Compass",
    ssl: false,
  })
  .catch((e) => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
