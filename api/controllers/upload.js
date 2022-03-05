const momoent = require("moment");

const UploadFile = async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded",
      });
    } else {
      //Use the name of the input field (i.e. "image") to retrieve the uploaded file
      let image = req.files.image;

      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      image.mv(
        "./uploads/images/" +
          momoent().format("DDmmyyhhmmss") +
          "." +
          image.mimetype.split("/")[1]
      );

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name:
            momoent().format("DDmmyyhhmmss") +
            "." +
            image.mimetype.split("/")[1],
          mimetype: image.mimetype,
          size: image.size,
          url: `${process.env.BASE_URL}/images/${
            new momoent().format("DDmmyyhhmmss") +
            "." +
            image.mimetype.split("/")[1]
          }`,
        },
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  UploadFile,
};
