const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MCQQuestionSchema = new Schema(
  {
    name: String,
    domain: String,
    subDomain: String,
    url: String,
    type: String,
  },
  {
    timestamps: true,
  }
);

const MultipleChoice = mongoose.model("MCQ", MCQQuestionSchema);

module.exports = MultipleChoice;
