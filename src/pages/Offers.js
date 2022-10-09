import { useNavigate } from "react-router-dom"
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
  <img src={props.img} alt={defaultImg} class="center"/>
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
      <div exact path="/Offer" key={piece.id} class="offer" onClick={() => CustomLink('/Offer')}>
        {RenderPiece(piece)}</div>)}
      </div>
    </>
  )
}

function CustomLink(to) {
  console.log('go to offer');
  let navigate = useNavigate();
  navigate(to);
}
