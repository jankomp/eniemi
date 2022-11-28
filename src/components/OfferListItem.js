import { List , ListItem, ListItemAvatar } from '@mui/material';

// Add styles to the page
import "./styles_css/offerListItem.css"

const OfferListItem=({arr})=>{
    let imageurl;
    if (arr.data.images) {
        imageurl = arr.data.images[0];
    }

    return (
        <List className="offer__list">
        <ListItem className="listItem">
            <img src={imageurl} alt="Offer image" className="centerImage"/>
            <div className="itemInfo">
                <div className="itemName-div">
                    {arr.data.name}
                </div>
                {/* <h2 ></h2>
                <br /> */}
                
                {/* <p className="itemInfoLine">{arr.data.desc}</p>
                <br /> */}

                <p className="itemInfoLine">
                    {arr.data.desc}
                    
                </p>

                <div className="itemPriseLine-div">
                    {arr.data.price} €
                </div>
                {/* <p className="itemInfoLine">{arr.data.price} €</p>
                <br /> */}
            </div>
        <ListItemAvatar />
        </ListItem>
        </List>

    )
};
export default OfferListItem;