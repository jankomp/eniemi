import { Link } from "react-router-dom"
import defaultImg from '../res/default.jpg';
import sofaImg from '../res/sofa.jpg';
import tableImg from '../res/table.jpg';
import chairImg from '../res/chair.jpg';

export default function Offers() {
  return pieces()
}

function RenderPiece(props) {
  return (<>
  <h2>{props.name}</h2>
  <p>{props.desc}</p>
  <p>{props.price}</p>
  <img src={props.img} alt={defaultImg} className="center"/>
  </>
  )
}


function pieces() {
  const piecelist = [
    {id: 1, name: 'chair', desc: 'beatiful chair', price: '4 €', img: chairImg}, 
    {id:2, name: 'table', desc: 'beautiful table', price: '16 €', img: tableImg}, 
    {id:3, name: 'sofa', desc: 'beautiful sofa', price: '14 €', img: sofaImg}
  ];
  return (
    <>
    <h1>Offers</h1>
    <div>
      {piecelist.map((piece) => 
      <Link to={'/Offer'}><div exact path="/Offer" key={piece.id} className="offer">
        {RenderPiece(piece)}</div></Link>)}
      </div>
    </>
  )
}

