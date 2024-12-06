import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../firebaseConfig"; 

const auth = getAuth(app);


export const isAuthenticated = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });
};


export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; 
  } catch (error) {
    throw new Error(error.message); 
  }
};


export const logout = async () => {
  await signOut(auth);
};
