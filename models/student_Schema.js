const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    college: {
      type: String,
      required: true,
    },
    dsaFinalScore: {
      type: Number,
    },
    webDFinalScore: {
      type: Number,
    },
    reactFinalScore: {
      type: Number,
    },
    status: {
      type: String,
      required: true,
    },
    interview: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
      },
    ],
    result: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
