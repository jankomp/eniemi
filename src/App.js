import Navbar from "./Navbar"
import DetailedOffer from "./pages/DetailedOffer"
import CreateOffer from "./pages/CreateOffer"
import Offers from "./pages/Offers"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./Auth"

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/detailedOffer/:id" element={<DetailedOffer />}/>
          <Route path="/createOffer" element={<CreateOffer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </AuthProvider>
  )
}

export default App
