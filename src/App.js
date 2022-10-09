import Navbar from "./Navbar"
import Offer from "./pages/Offer"
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
          <Route path="/offer" element={<Offer />} />
        </Routes>
      </div>
    </>
  )
}

export default App
