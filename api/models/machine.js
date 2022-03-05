const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Machine = new Schema(
  {
    machine_image: {
      type: String,
      required: true,
    },
    machine_name: {
      type: String,
      required: true,
    },
    machine_location: {
      type: Array,
      required: true,
    },
    machine_detail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("machine", Machine);
