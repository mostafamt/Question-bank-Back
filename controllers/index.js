const excelToJson = require("convert-excel-to-json");
const fs = require("fs-extra");
const {
  listFiles,
  uploadFile,
  saveFileToDatabase,
  saveFilesToDatabase,
  getQuestionById,
  deleteQuestionById,
} = require("../firebase");
const {
  generateTrueFalseQuestion,
  generateAndUploadMutipleChoicesQuestions,
  generateFillSpaceQuestion,
} = require("../Question/Generators");

const getQuestionsController = async (req, res) => {
  const data = await listFiles();
  data.reverse();
  res.status(200).send(data);
};

const postMCQController = async (req, res) => {
  const { name: objectName, questions } = req.body;

  if (!objectName || !questions) {
    res.status(400).send();
  }

  const files = await generateAndUploadMutipleChoicesQuestions(
    objectName,
    questions
  );
  res.status(200).send({ urls: files });
};

const postTrueFalseQuestionController = async (req, res) => {
  const { name: objectName, question, answer } = req.body;
  const file = generateTrueFalseQuestion(question, answer);
  const { url, id } = await uploadFile(file);
  saveFileToDatabase(id, objectName, url, TRUE_FALSE_TYPE);
  res.status(200).send({ url: url });
};

const postFillSpaceQuestionController = async (req, res) => {
  const { name: objectName, question_header, questions, answers } = req.body;
  const file = generateFillSpaceQuestion(question_header, questions, answers);
  const { url, id } = await uploadFile(file);
  saveFileToDatabase(id, objectName, url, FILL_IN_THE_SPACE_TYPE);
  res.status(200).send({ url: url });
};

const getQuestionController = async (req, res) => {
  const { id } = req.query;
  const { status, question } = await getQuestionById(id);
  res.status(status).send(question);
};

const deleteQuestionController = async (req, res) => {
  const { id } = req.query;
  const { status, question } = await deleteQuestionById(id);
  res.status(status).send(question);
};

const uploadFileController = async (req, res) => {
  try {
    if (req.file?.filename == null || req.file?.filename == undefined) {
      req.status(400).json("No File");
    } else {
      let filePath = "uploads/" + req.file.filename;
      console.log(req.file.filename);
      const excelData = excelToJson({
        sourceFile: filePath,
        header: {
          rows: 1,
        },
        columnToKey: {
          "*": "{{columnHeader}}",
        },
      });
      fs.remove(filePath);

      const objectName = excelData.Sheet1[0].name;
      const questions = excelData.Sheet1.map((sheet) => {
        const options = sheet.options.split(";");
        const corrects = sheet.correct.split(";");
        return {
          title: sheet.title,
          options: options.map((opt, idx) => {
            return {
              title: opt,
              correct: corrects[idx].toLowerCase() === "true",
            };
          }),
        };
      });
      const files = await generateAndUploadMutipleChoicesQuestions(
        objectName,
        questions
      );

      res.status(200).json({ urls: files });
    }
  } catch (error) {
    res.status(500);
  }
};

const IndexController = async (req, res) => {
  res.status(200).send({ message: "hello world" });
};

module.exports = {
  postMCQController,
  getQuestionsController,
  postTrueFalseQuestionController,
  postFillSpaceQuestionController,
  getQuestionController,
  deleteQuestionController,
  uploadFileController,
  IndexController,
};
