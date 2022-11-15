import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { auth } from "../firebase.js";
import { AuthContext } from "../Auth.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { TextField, Button} from "@mui/material"
import { padding } from "@mui/system";

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
        <h1 className="pageTitle">E-Niemi</h1>
        <form onSubmit={handleLogin}>
            <label className="userFormLine">
            Email
            </label>
            <br/>
            <TextField variant="outlined" 
             name="email"
             onChange={HandleInputChange}
             placeholder="Please enter text"
             />
            <br/>
            <br/>

            <label className="userFormLine">
            Password
            </label>
            <br/>
            <TextField variant="outlined" 
             name="password"
             onChange={HandleInputChange}
             placeholder="Please enter text"/>
            <br/>

            <br/><br/><br/>

            <Button variant="contained"
            type="submit"
            className="userFormLine"
            sx={{ borderRadius: 40
             }}

            >Start!
        
            </Button>

            <br/>

            

        </form>
        </div>
        <Link to={'/signup'} className="userFormLine">Not registered? signup!</Link>
    </>
  );
};

export default Login;