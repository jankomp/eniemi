import Navbar from "./Navbar"
import DetailedOffer from "./pages/DetailedOffer"
import CreateOffer from "./pages/CreateOffer"
import Offers from "./pages/Offers"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import { Route, Routes } from "react-router-dom"

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detailedOffer/:id" element={<DetailedOffer />}/>
          <Route path="/createOffer" element={<CreateOffer />} />
        </Routes>
      </div>
    </>
  )
}

export default App
