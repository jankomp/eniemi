import { List , ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const OfferListItem=({arr})=>{
    let imageurl;
    if (arr.data.images) {
        imageurl = arr.data.images[0];
    }

    return (
        <List className="offer__list">
        <ListItem className="listItem">
            <img src={imageurl} alt="Offer image" className="center"/>
            <div className="itemInfo">
                <h2 className="itemName">{arr.data.name}</h2>
                <br />
                <p className="itemInfoLine">{arr.data.desc}</p>
                <br />
                <p className="itemInfoLine">{arr.data.price}€</p>
                <br />
            </div>
        <ListItemAvatar />
        </ListItem>
        </List>
    )
};
export default OfferListItem;