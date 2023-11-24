const fs = require("fs");
const { generateNewMcqQuestion } = require("./Generators");
const { uploadFile, saveFilesToDatabase } = require("../firebase");

const replaceMcqQuestionTitle = (content, questionTitle) => {
  return content.replace(
    /<p>How old are you\?<\/p>/g,
    `<p>${questionTitle}</p>`
  );
};

const getOption = (title, correct, tip) => {
  const option = {
    correct: correct,
    tipsAndFeedback: {
      chosenFeedback: "<div></div>\\n",
      notChosenFeedback: "<div></div>\\n",
      tip: tip,
    },
    text: `<div>${title}</div>\\n`,
  };
  return option;
};

const replaceMcqQuestionOptions = (content, options) => {
  const array = options.map((option) => {
    const { title, correct, tip } = option;
    return getOption(title, correct, tip);
  });
  return content.replace(
    /\"answers\"[\s\S]*\\n"}]/g,
    `"answers":${JSON.stringify(array)}`
  );
};

module.exports = {
  replaceMcqQuestionTitle,
  replaceMcqQuestionOptions,
};
