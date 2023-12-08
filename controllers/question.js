const Question = require("../models/Question");

const index = async (req, res) => {
  try {
    const questions = await Question.find({}).sort({ createdAt: -1 });
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const create = async (req, res) => {
  const {
    name: objectName,
    domain,
    subDomain,
    questions,
    objectOwner,
    topic,
    language,
    questionType,
  } = req.body;

  if (!objectName || !questions) {
    res.status(400).send();
  }

  const question = await Question.create({
    name: objectName,
    domain,
    subDomain,
    objectOwner,
    topic,
    language,
    type: questionType,
    question: questions[0],
  });

  res.status(200).send(question);
};

const edit = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  console.log(body);
  try {
    const question = await Question.updateOne(
      { _id: id },
      { $set: { ...body } }
    );
    res.status(200).json(question);
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

module.exports = { index, create, show, edit, destroy };
