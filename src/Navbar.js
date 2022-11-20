import { useContext } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { AuthContext } from "./Auth"

export default function Navbar() {
  const [currentUser, ] = useContext(AuthContext);
  //console.log("user = " + currentUser);

  if (currentUser) {
    return (
      <nav class="navbar">
        <div class="menu-container">
          <div class="offers menu-item">
            <CustomLink to="/offers" className="navBarLink">Offers</CustomLink>
          </div>
          <div class="create-offer menu-item">
            <CustomLink to="/createOffer" class="navBarLink">Create Offer</CustomLink>
          </div>
          <div class="chats menu-item">
            <CustomLink to="/chats" class="navBarLink">Chats</CustomLink>
          </div>
          <div class="profile menu-item">
            <CustomLink to="/profile" class="navBarLink">Profile</CustomLink>
          </div>
          <div class="logout menu-item">
            <CustomLink to="/logout" class="navBarLink">Logout</CustomLink>
          </div>
        </div>
      </nav>
    );
  } else {
    return (
      <nav class="navbar">
        {/* <Link to="/" className="site-title">
          E-niemi
        </Link> */}
        <div class="menu-container">
          <div class="offers menu-item">
              <CustomLink to="/offers" class="navBarLink">Offers</CustomLink>
          </div>
          <div class="login menu-item">
            <CustomLink to="login" class="navBarLink">Login</CustomLink>
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
    <div class={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </div>
  )
}
