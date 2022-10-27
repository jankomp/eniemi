import { List , ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const OfferListItem=({arr})=>{
    let imageurl;
    if (arr.data.images) {
        imageurl = arr.data.images[0];
    }

    return (
        <List className="offer__list">
        <ListItem>
            <h2>{arr.data.name}</h2>
            <br />
            <p>{arr.data.desc}</p>
            <br />
            <p>{arr.data.price}</p> €
            <br />
            <img src={imageurl} alt="Offer image" className="center"/>
        <ListItemAvatar />
        </ListItem>
        </List>
    )
};
export default OfferListItem;