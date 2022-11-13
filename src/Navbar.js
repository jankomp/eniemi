import { useContext } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { AuthContext } from "./Auth"

export default function Navbar() {
  const [currentUser, ] = useContext(AuthContext);
  //console.log("user = " + currentUser);

  if (currentUser) {
    return (
      <nav className="nav">
        <Link to="/" className="site-title">
          E-niemi
        </Link>
        <ul>
          <CustomLink to="/createOffer" className="navBarLink">Create Offer</CustomLink>
          <CustomLink to="/offers" className="navBarLink">Offers</CustomLink>
          <CustomLink to="/chats" className="navBarLink">Chats</CustomLink>
          <CustomLink to="/profile" className="navBarLink">Profile</CustomLink>
          <CustomLink to="/logout" className="navBarLink">Logout</CustomLink>
        </ul>
      </nav>
    );
  } else {
    return (
      <nav className="nav">
        <Link to="/" className="site-title">
          E-niemi
        </Link>
        <ul>
          <CustomLink to="/offers" className="navBarLink">Offers</CustomLink>
          <CustomLink to="login" className="navBarLink">Login</CustomLink>
        </ul>
      </nav>
    );
  }
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
