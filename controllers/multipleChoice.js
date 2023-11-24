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
  } = req.body;
  console.log(req.body);

  if (!objectName || !questions) {
    res.status(400).send();
  }

  const files = await generateAndUploadMutipleChoicesQuestions(
    objectName,
    questions
  );
  const questionRes = await Promise.all(
    files.map(async (file) => {
      const quest = await MultipleChoice.create({
        name: objectName,
        domain: domain,
        subDomain: subDomain,
        objectOwner: objectOwner,
        url: file,
        type: "Multiple Choice",
      });
      return quest;
    })
  );

  res.status(200).send({ questionRes, questions });
};

module.exports = { create };
