const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    result: {
      type: String,
      required: true,
    },
    student: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Result = mongoose.model("Result", resultSchema);
module.exports = Result;
