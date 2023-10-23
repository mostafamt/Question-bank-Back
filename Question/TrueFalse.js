const fs = require("fs");

const replaceQuestion = (content, question, answer) => {
  return content
    .replace(/\"correct":"true\"/g, `"correct":"${answer}"`)
    .replace(/<p>Question<\/p>/g, `<p>${question}</p>`);
};

module.exports = {
  replaceQuestion,
};
