const {
  generateAndUploadMutipleChoicesQuestions,
} = require("../Question/Generators");
const MultipleChoice = require("../models/Question");

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

  const files = await generateAndUploadMutipleChoicesQuestions(
    objectName,
    questions
  );
  const questionRes = await Promise.all(
    files.map(async (file, idx) => {
      const quest = await MultipleChoice.create({
        name: objectName,
        domain,
        subDomain,
        objectOwner,
        topic,
        language,
        url: file,
        type: questionType,
        question: questions[idx],
      });
      return quest;
    })
  );

  res.status(200).send({ questionRes, questions });
};

module.exports = { create };
