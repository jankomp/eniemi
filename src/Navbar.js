import { useContext } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom"
import { AuthContext } from "./Auth"

export default function Navbar() {
  const [currentUser, setCurrentUser] = useContext(AuthContext);
  console.log("user = " + currentUser);

  if (currentUser) {
    return (
      <nav className="nav">
        <Link to="/" className="site-title">
          E-niemi
        </Link>
        <ul>
          <CustomLink to="/createOffer">Create Offer</CustomLink>
          <CustomLink to="/offers">Offers</CustomLink>
          <CustomLink to="/profile">Profile</CustomLink>
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
          <CustomLink to="/offers">Offers</CustomLink>
          <CustomLink to="login">Login</CustomLink>
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
