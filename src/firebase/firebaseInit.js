import firebase from "firebase/app";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBevXd0SZSCLOKaeXXBGHTQaByOGdbf384",
  authDomain: "fireblogzy-a84a1.firebaseapp.com",
  projectId: "fireblogzy-a84a1",
  storageBucket: "fireblogzy-a84a1.appspot.com",
  messagingSenderId: "312470864182",
  appId: "1:312470864182:web:edcac0f34f57a8bda2b397",
  measurementId: "G-YFL2K8GHD8"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {timestamp};
export default firebaseApp.firestore();
