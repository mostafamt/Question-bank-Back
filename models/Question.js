const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MCQQuestionSchema = new Schema({
  name: String,
  url: String,
  type: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

MCQQuestionSchema.set("toObject", {
  transform: function (doc, ret) {
    delete ret.__v;
  },
});

const MCQ = mongoose.model("MCQ", MCQQuestionSchema);

module.exports = MCQ;
