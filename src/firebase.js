import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut  } from "firebase/auth";
import toast from "react-hot-toast"
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
    try
    {
        const {user}=await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Created new user.");
        return user;
    }
    catch(e)
    {
        toast.error(e.message);
    }
   
}
export const signIn=async(email,password)=>{
    try{
        const {user}=await signInWithEmailAndPassword(auth, email, password);
        toast.success("You are logged in.");
        return user;
    }
    catch(e)
    {
        toast.error(e.message);
    }
}
export const getCurrentUser=()=>{
     onAuthStateChanged(auth,(user)=>{
        if(user)
        {
            toast.success("User session found");
          
        }
        else
        {
            toast.error("There is no session.");
        }
    })
}
export const logOut=async()=>{
    try{
        await signOut(auth);
        getCurrentUser();
    }
    catch(e)
    {
        toast.error(e.message);
    }
    
}
export default app

