const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const Upload = require("../controllers/upload");
const router = express.Router();

router.post("/upload-image", authenticateToken, Upload.UploadFile);

module.exports = router;
