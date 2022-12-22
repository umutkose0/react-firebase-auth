import {Link} from "react-router-dom"
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { logOut } from "../firebase";
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
        <UpdateProfile name={user.displayName} phone={user.phoneNumber}/>
        </div>
        
    </div>);
}