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
            switch (error.code){
              case 'auth/user-not-found':
                alert("User not found. Please sign up.");
                return;
            }
            alert(error.message);
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
        <h1 className="pageTitle">Log in</h1>
        <form onSubmit={handleLogin}>
            <label className="userFormLine">
            Email
            </label>
            <input name="email" type="email" placeholder="Email" onChange={HandleInputChange}/>
            <br/>
            <label className="userFormLine">
            Password
            </label>
            <input name="password" type="password" placeholder="Password" onChange={HandleInputChange}/>
            <button type="submit" className="userFormLine">Log in</button>
        </form>
        </div>
        <label className="userFormLine">Not registered? </label>
        <Link to={'/signup'} className="userFormLine">signup</Link>
    </>
  );
};

export default Login;