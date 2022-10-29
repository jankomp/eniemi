import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from '../firebase';
import { AuthContext } from "../Auth.js";


export default function Logout(){
    const navigate = useNavigate();
    const [, setCurrentUser] = useContext(AuthContext);

    useEffect(() => {
        signOut(auth);
        setCurrentUser([]);

        navigate('/');
    }, []);

    return( <h2>Logging out...</h2>);
}