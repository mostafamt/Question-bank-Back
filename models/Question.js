const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MCQQuestionSchema = new Schema(
  {
    name: String,
    domain: String,
    subDomain: String,
    objectOwner: String,
    topic: String,
    language: String,
    url: String,
    type: String,
    question: Object,
    // question: {
    //   title: String,
    //   options: [
    //     {
    //       title: String,
    //       correct: Boolean,
    //       tip: String,
    //     },
    //   ],
    // },
  },
  {
    timestamps: true,
  }
);

const MultipleChoice = mongoose.model("MCQ", MCQQuestionSchema);

module.exports = MultipleChoice;
