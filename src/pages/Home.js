import {Link} from "react-router-dom"
import { useDispatch,useSelector } from "react-redux";
import { logOut,verifyEmail } from "../firebase";
import { logout as logoutHandle} from "../store/auth";
import { useNavigate } from "react-router-dom";
import UpdateProfile from "./../components/UpdateProfile";
export default function Home(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user} =useSelector(state=>state.auth)
    console.log(user)
    const handleLogout=async()=>{
        await logOut();
        dispatch(logoutHandle())
        navigate("/login",{replace:true});
    }
    const sendEmail=async(e)=>{
        e.target.classList.add("invisible")
        await verifyEmail();
      }
    return !user?(
        <div className="flex justify-center my-5">
            <Link className="bml-10 rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" to="/register">Signup</Link>
            
            <Link className="ml-10 rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" to="/login">Signin</Link>
        </div>
    ):(
    <div className="py-5 flex flex-col justify-center">
        <div className="flex justify-center items-center mb-8">
        {user.email}
        <button onClick={handleLogout} className="ml-10 rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
        logout
        </button>
        </div>
        <div className="flex justify-center w-100 mb-8">
         {user.emailVerified?"":(<span  onClick={sendEmail} className="bg-green-400 fixed top-0 left-0 right-0 text-center text-white">Verify your email adress <u>send via email</u></span>)}
        <UpdateProfile name={user.displayName}/>
        </div>
    </div>);
}