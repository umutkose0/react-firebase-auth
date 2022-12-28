import { initializeApp } from "firebase/app";
import {signInWithPopup,GoogleAuthProvider , sendEmailVerification ,updateProfile ,getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut  } from "firebase/auth";
import toast from "react-hot-toast"
import store from "./store"

import { login as loginHandle,logout as logoutHandle } from "./store/auth";
const firebaseConfig= {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
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
        return false;
    }
}
export const googleSignIn=async()=>{
    const provider=new GoogleAuthProvider();
    try{
        const r=await signInWithPopup(auth,provider)
        console.log(r.user);
        toast.success("logged in with google");
        return r.user;
    }catch(e){
        toast.error(e.message);
    }
    
}
export const getCurrentUser=()=>{
     onAuthStateChanged(auth,(user)=>{
        if(user)
        {
            toast.success("You are already logged in.");
            store.dispatch(loginHandle(user))
            return true
        }
        else
        {
            toast.error("Logged out.");
            store.dispatch(logoutHandle());
        }
    })
} 
getCurrentUser()
export const logOut=async()=>{
    try{
        await signOut(auth);
        toast.success("You are logged out.")
    }
    catch(e)
    {
        toast.error(e.message);
    }
    
}
export const updateUser=async(data)=>{
    try{
        await updateProfile(auth.currentUser,data)
        toast.success("profile updated.");
        return true
    }
    catch(e){
        toast.success("An error occured.");
    }
}
export const verifyEmail=async()=>{
    try{
        await sendEmailVerification(auth.currentUser)
        toast.success("Verification email sent. Check your inbox.")
        return true
    }
    catch(e){
        toast.error(e.message)
    }
    
}
export default app

