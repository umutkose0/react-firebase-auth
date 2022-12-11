import {register,signIn} from "./firebase"
import './App.css';
import {useState} from 'react';
function App() {
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const registerHandle=async(e)=>{
    e.preventDefault();
    let user={};
    try{
      user=await register(email,password);
      alert("Success.");
    }
    catch(error)
    {
      alert(error.message);
    } 
   
    console.log(user);
  }
  const signinHandle=async(e)=>{
    e.preventDefault();
    let user={};
    try{
      user=await signIn(email,password);
      alert("Success.");
    }
    catch(error)
    {
      alert(error.message);
    } 
    console.log(user);
  }
  return (
    <div className="App">
      <h1>Register</h1>
      <form >
        Email:<input  value={email} onChange={(e)=>{setEmail(e.target.value)}} type="text"/> 
        Password:<input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password"/>
        <br/><br/><button disabled={!email || !password} type="submit" onClick={registerHandle}>Register</button>
        <button disabled={!email || !password} type="submit" onClick={signinHandle}>Sign in</button>
      </form>
    </div>
  );
}

export default App;
