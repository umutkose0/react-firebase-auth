import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "firebase/auth";

const firebaseConfig= {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const register=async(email,password)=>{

    const {user}=await createUserWithEmailAndPassword(auth, email, password);
    return user;
}
export const signIn=async(email,password)=>{
    const {user}=await signInWithEmailAndPassword(auth, email, password);
    return user;
}
export default app
