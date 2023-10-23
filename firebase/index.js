const { v4: uuidv4 } = require("uuid");
const { initializeApp } = require("firebase/app");
const MCQ = require("../models/Question");

const {
  getStorage,
  uploadString,
  getDownloadURL,
  ref,
} = require("firebase/storage");
const { getFirestore, doc, deleteDoc } = require("firebase/firestore");
const { firebaseConfig } = require("./config");

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);
const db = getFirestore(firebase);

//////////////////////////////////
// FIRESTORAGE
//////////////////////////////////
const uploadFile = async (file) => {
  const metadata = {
    contentType: "text/html",
  };
  const id = uuidv4();
  const storageRef = ref(storage, `/templates/${id}.html`);
  const snapshot = await uploadString(storageRef, file, "raw", metadata);
  const url = await getDownloadURL(snapshot.ref);
  return { url, id };
};

const uploadImage = async (file) => {
  const metadata = {
    contentType: "image/png",
  };
  const id = uuidv4();
  const storageRef = ref(storage, `/templates/${id}`);
  const snapshot = await uploadString(storageRef, file, "raw", metadata);
  const url = await getDownloadURL(snapshot.ref);
  return { url, id };
};

//////////////////////////////////
// MONGODB
//////////////////////////////////
const saveFileToMongo = async (name, fileUrl, type) => {
  const data = await MCQ.create({
    name,
    url: fileUrl,
    type,
  });
};

const listFiles = async () => {
  const data = await MCQ.find({});
  return data;
};

const getQuestionById = async (id) => {
  const question = await MCQ.findById(id);
  if (question) {
    return { status: 200, question };
  } else {
    return { status: 404, question: "Not Found" };
  }
};

const deleteQuestionById = async (id) => {
  try {
    await deleteDoc(doc(db, "templates", id));
    return {
      status: 200,
      question: "question deleted !",
    };
  } catch (error) {
    return {
      status: 400,
      question: "question didn't deleted !",
    };
  }
};

module.exports = {
  uploadFile,
  uploadImage,
  listFiles,
  getQuestionById,
  deleteQuestionById,
  saveFileToMongo,
};
