import { List , ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {db} from '../firebase.js';
import { doc, deleteDoc } from "firebase/firestore";
import defaultImg from '../res/default.jpg';

const OfferListItem=({arr})=>{
return (
<List className="offer__list">

<ListItem>
    <h2>{arr.item.name}</h2>
    <p>{arr.item.desc}</p>
    <p>{arr.item.price}</p>
    <img src={arr.item.img} alt={defaultImg} className="center"/>
<ListItemAvatar />
</ListItem>
</List>
)
};
export default OfferListItem;