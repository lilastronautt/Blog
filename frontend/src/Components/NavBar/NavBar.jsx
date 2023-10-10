import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <>
      <nav className="nav">
        <div className="nav_logo__cont">
          <NavLink
            className="routerLink"
            activeClassName="routerLink_active"
            to="/"
          >
            Blogging
          </NavLink>
        </div>
        <ul className="nav_link__cont">
          <li>
            <NavLink
              className="routerLink"
              to="/createblog"
              activeClassName="routerLink_active"
            >
              Create blog
            </NavLink>
          </li>
          <li>
            <NavLink
              className="routerLink"
              to="/myprofile"
              activeClassName="routerLink_active"
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              className="routerLink routerLink_alt"
              to="/login"
              activeClassName="routerLink_active routerLink_active__alt"
            >
              Sign in
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
