import { getAuth } from "firebase/auth"
import { Button} from "@mui/material"

export default function Profile() {
const auth = getAuth();
const user = auth.currentUser;

  return (<>
    <h1>{user.displayName}</h1>
    <p>{user.email}</p>
    <div>
       <Button variant="contained">Contained</Button>
       <Button variant="outlined">Outlined</Button>
    </div>
    </>)
}
