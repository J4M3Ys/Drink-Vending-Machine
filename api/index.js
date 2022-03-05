const morgan = require("morgan");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./connection");
const _ = require("lodash");
const fileUpload = require("express-fileupload");

const Machine = require("./routes/machine");
const Product = require("./routes/product");
const User = require("./routes/user");
const Upload = require("./routes/upload");

dotenv.config();

const app = express();
const port = 7000;

db.on("error", console.error.bind(console, "(MongoDB) Connection error :"));

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(express.static("uploads"));
//#region Routes

app.use("/api/v1", Upload);
app.use("/api/v1", Machine);
app.use("/api/v1", Product);
app.use("/api/v1", User);

//#endregion

app.listen(port, () => console.log(`Server running on port ${port}`));
