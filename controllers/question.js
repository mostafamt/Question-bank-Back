const Question = require("../models/Question");

const index = async (req, res) => {
  try {
    const questions = await Question.find({}).sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const show = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.findOne({ _id: id });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const destroy = async (req, res) => {
  const { id } = req.params;
  try {
    const question = await Question.deleteOne({ _id: id });
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { index, show, destroy };
