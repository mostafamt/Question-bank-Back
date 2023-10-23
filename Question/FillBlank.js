const fs = require("fs");

const replaceQuestionHeader = (content, questionTitle) => {
  return content.replace(
    /<p>Write[\s\S]*?definition:<\/p>/g,
    `<p>${questionTitle}</p>`
  );
};

const replaceQuestions = (content, questions, answers) => {
  return content.replace(
    /"<p>Definition[\s\S]*?Keyword\*<\/p>\\\\n"/g,
    questions
      .map(
        (question, idx) =>
          `"<p>${question}</p>\\\\n\\\\n<p>*${answers[idx]}*</p>\\\\n"`
      )
      .join(",")
  );
};

module.exports = {
  replaceQuestionHeader,
  replaceQuestions,
};
