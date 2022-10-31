import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from '../firebase.js';
import { collection, addDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Auth";
import { auth } from '../firebase';

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
        });
    }

    return (
        <>
            <div>
            <h1>Sign up</h1>
            <form onSubmit={createUser}>
                <label>
                Name
                <input name="name" type="name" placeholder="Name" onChange={HandleInputChange}/>
                </label>
                <br />
                <label>
                Email
                <input name="email" type="email" placeholder="Email" onChange={HandleInputChange}/>
                </label>
                <br />
                <label>
                Password
                <input name="password" type="password" placeholder="Password" onChange={HandleInputChange}/>
                </label>
                <br />
                <button type="submit">Sign up</button>
            </form>
            </div>
        </>
    )
}