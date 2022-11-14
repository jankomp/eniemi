import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../firebase.js';
import { collection, addDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth";
import { auth } from '../firebase';

// Add styles to the page
import "./styles_css/signup_page.css"

export default Signup

function Signup() {
    const [signup, setSignup] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [ currentUser, setCurrentUser ] = useContext(AuthContext);

    const navigate = useNavigate();

    const HandleInputChange = (e) => {
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
        });
    }

    function createUser(event) {
        event.preventDefault();
        if (currentUser) {
            auth.signOut();
        }

        createUserWithEmailAndPassword(auth, signup.email, signup.password)
        .then(() => {
            console.log('User created!');

            signInWithEmailAndPassword(auth, signup.email, signup.password).then((userCredential) => {
                const user = userCredential.user;
                setCurrentUser(user);
                updateProfile(auth.currentUser, {displayName: signup.name});
                navigate('/');
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
              });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode + ' : ' + errorMessage);
            alert(errorCode + ' : ' + errorMessage);
        });
    }

    return (
        <>  
            <main>
                <div class="title">
                    E-niemi
                    <div class="sub-title">
                    Registration
                    </div>
                </div>
                <form action="#" onSubmit={createUser}>
                    <div class="field_group">
                        <div class="labelgroup">
                            <label for="name" >Your name </label>
                        </div>
                        <input id="name" placeholder="Enter your name" class="input_bar" onChange={HandleInputChange}></input>
        
                    </div>

                    <div class="field_group">
                            <div class="labelgroup">
                                <label for="email">Your email</label>
                            </div>
                            <input id="email" placeholder="Enter your email" class="input_bar" onChange={HandleInputChange}></input>

                    </div>

                    <div class="field_group">
                            <div class="labelgroup">
                                <label for="password">Create your password </label>
                            </div>
                            <input id="password" placeholder="Enter your password" class="input_bar" onChange={HandleInputChange}></input>
                    </div>

                    <button class="submit-button" type="submit" >Sign up</button>
                    
                </form>    
            </main>


        </>
    )
}