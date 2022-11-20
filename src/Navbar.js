import { useContext } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { AuthContext } from "./Auth"

export default function Navbar() {
  const [currentUser, ] = useContext(AuthContext);
  //console.log("user = " + currentUser);

  if (currentUser) {
    return (
      <nav className="navbar">
        <div className="menu-container">
          <div className="offers menu-item">
            <CustomLink to="/offers" className="navBarLink">Offers</CustomLink>
          </div>
          <div className="create-offer menu-item">
            <CustomLink to="/createOffer" className="navBarLink">Create Offer</CustomLink>
          </div>
          <div className="chats menu-item">
            <CustomLink to="/chats" className="navBarLink">Chats</CustomLink>
          </div>
          <div className="profile menu-item">
            <CustomLink to="/profile" className="navBarLink">Profile</CustomLink>
          </div>
          <div className="logout menu-item">
            <CustomLink to="/logout" className="navBarLink">Logout</CustomLink>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="navbar">
        {/* <Link to="/" className="site-title">
          E-niemi
        </Link> */}
        <div className="menu-container">
          <div className="offers menu-item">
              <CustomLink to="/offers" className="navBarLink">Offers</CustomLink>
          </div>
          <div className="login menu-item">
            <CustomLink to="login" className="navBarLink">Login</CustomLink>
          </div>
        </div>
      </nav>
    );
  }
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <div className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  )
}
