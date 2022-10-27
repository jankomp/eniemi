import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { auth } from "../firebase.js";
import { AuthContext } from "../Auth.js";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {

    const [login, setLogin] = useState({
        email: '',
        password: ''
    });

    const [ currentUser, setCurrentUser ] = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, login.email, login.password).then((userCredential) => {
            const user = userCredential.user;
            setCurrentUser(user);
            navigate('/');
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    }

    const HandleInputChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        });
    }

  return (
    <>
        <div>
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
            <label>
            Email
            <input name="email" type="email" placeholder="Email" onChange={HandleInputChange}/>
            </label>
            <label>
            Password
            <input name="password" type="password" placeholder="Password" onChange={HandleInputChange}/>
            </label>
            <button type="submit">Log in</button>
        </form>
        </div>
        <label>Not registered? </label>
        <Link to={'/signup'}>signup</Link>
    </>
  );
};

export default Login;