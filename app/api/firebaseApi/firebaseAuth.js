import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import firebase_app from "../../api/firebaseApi/firebaseConfig";

const signInWithEmailAndPasswordApi = async (email, password) => {
  const auth = getAuth(firebase_app);
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};

const createUserWithEmailAndPasswordApi = async (email, password) => {
  const auth = getAuth(firebase_app);
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};

export { signInWithEmailAndPasswordApi, createUserWithEmailAndPasswordApi };
