import { getAuth } from "firebase/auth"

export default function Profile() {
const auth = getAuth();
const user = auth.currentUser;

  return (<>
    <h1>{user.displayName}</h1>
    <p>{user.email}</p>
    </>)
}
