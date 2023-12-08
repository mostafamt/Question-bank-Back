const { initializeApp } = require("firebase/app");
const {
  getStorage,
  uploadString,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} = require("firebase/storage");
const multer = require("multer");
const { firebaseConfig } = require("../firebase/config");

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

const uploadFile = async (req, res) => {
  try {
    const dateTime = giveCurrentDateTime();

    const storageRef = ref(
      storage,
      `files/${req.file.originalname + "       " + dateTime}`
    );

    const metadata = {
      contentType: req.file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      req.file.buffer,
      metadata
    );

    const downloadURL = await getDownloadURL(snapshot.ref);
    res.status(200).json(downloadURL);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { uploadFile };
