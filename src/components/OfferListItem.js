import { List , ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {db} from '../firebase.js';
import { doc, deleteDoc } from "firebase/firestore";
import defaultImg from '../res/default.jpg';

const OfferListItem=({arr})=>{
return (
<List className="offer__list">

<ListItem>
    <h2>{arr.data.name}</h2>
    <br />
    <p>{arr.data.desc}</p>
    <br />
    <p>{arr.data.price}</p> €
    <br />
    <img src={arr.data.img} alt={defaultImg} className="center"/>
<ListItemAvatar />
</ListItem>
</List>
)
};
export default OfferListItem;