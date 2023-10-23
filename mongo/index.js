const MCQ = require("../models/Question");

const create = async (name, fileUrl, type) => {
  const data = await MCQ.create({
    name,
    url: fileUrl,
    type,
  });
  console.log(data);
};

module.exports = { create };
