import { Link } from "react-router-dom"
import { db } from '../firebase.js';
import { collection , query, orderBy , onSnapshot, where, startAfter, limit, getDocs} from 'firebase/firestore';
import {React, useState, useEffect} from "react";
import { getAuth } from "firebase/auth"
import { Button} from "@mui/material"

export default function Profile() {
const auth = getAuth();
const user = auth.currentUser;

  return (<>
    <h1>{user.displayName}</h1>
    <p>{user.email}</p>
    </>)
}
export default DisplayImage;