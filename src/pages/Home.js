import {Link} from "react-router-dom"
export default function Home(){
    return(
        <div>
            <Link to="/register">Sign Up</Link>
            <Link to="/login">Sign In</Link>
        </div>
    );
}