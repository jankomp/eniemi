import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { auth } from "../firebase.js";
import { AuthContext } from "../Auth.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TextField, Button} from "@mui/material"
import { padding } from "@mui/system";

// Add styles to the page
import "./styles_css/login_page.css"

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
        <main>
                <div className="title">
                    E-niemi
                    <div className="sub-title">
                    Login
                    </div>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="field_group">
                            <div className="labelgroup">
                                <label for="email">Your email</label>
                            </div>
                            <input name="email" id="email" placeholder="Enter your email" className="input_bar" onChange={HandleInputChange}></input>

                    </div>

                    <div className="field_group">
                            <div className="labelgroup">
                                <label for="password">Create your password </label>
                            </div>
                            <input name="password" id="password" placeholder="Enter your password" className="input_bar" type = "password" onChange={HandleInputChange}></input>
                    </div>

                    <button className="submit-button" type="submit" >Start!</button>
                    
                    <div className="link-to-registration">
                        <Link to={'/signup'} className="link" >Don't have an account? Create a new one!</Link>
                    </div>
                </form>
        </main>
    </>
  );
};

export default Login;