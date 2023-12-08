const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const { uploadFile } = require("./controllers/upload");

const {
  postMCQController,
  getQuestionsController,
  postTrueFalseQuestionController,
  postFillSpaceQuestionController,
  getQuestionController,
  deleteQuestionController,
  uploadFileController,
  IndexController,
} = require("./controllers");
const {
  index,
  create,
  show,
  edit,
  editQuestion,
  destroy,
} = require("./controllers/question");
const MultipleChoice = require("./controllers/multipleChoice");
const { uploadImage } = require("./firebase");

require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const app = express();
let upload = multer({ storage: multer.memoryStorage() });

// Fix to test with Postman
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json({ limit: "1mb" }));

app.post("/fill-space", postFillSpaceQuestionController);
app.post("/multiple-choice", MultipleChoice.create);
app.post("/true-false", postTrueFalseQuestionController);
// app.get("/list", getQuestionsController, postTrueFalseQuestionController);
app.get("/question", getQuestionController);
app.delete("/question", deleteQuestionController);
app.post("/upload", upload.single("filename"), uploadFile);

// app.get("/", IndexController);
app.delete("/question/:id", destroy);
app.get("/question/:id", show);
app.get("/", index);
app.put("/question/:id", edit);
app.post("/question", create);
// app.post

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
