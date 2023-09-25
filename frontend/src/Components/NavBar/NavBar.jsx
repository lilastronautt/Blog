import "./NavBar.css";
import Login from "../userActions/login/Login";
import Register from "../userActions/register/Register";
import { useSelector, useDispatch } from "react-redux";
import { blogActions } from "../../store/store";
import UserDetails from "../userActions/userDetails/UserDetails";

const NavBar = () => {
  const dispatch = useDispatch();
  const showLogin = useSelector((state) => state.showLogin);
  const showBackdrop = useSelector((state) => state.showBackdrop);
  const showRegistration = useSelector((state) => state.showRegistration);
  const onClickHandler = () => {
    dispatch(blogActions.showLoginModal(true));
    dispatch(blogActions.showBackdropModal(true));
  };

  return (
    <>
      <nav className="nav">
        <div className="nav_logo__cont">Blog Website</div>
        <ul className="nav_link__cont">
          <li>Something</li>
          <li>Something</li>
          <li>Something</li>
          <li onClick={onClickHandler}>sign in</li>
        </ul>
      </nav>
      {showLogin && <Login />}
      {showRegistration && <Register />}
      {showBackdrop && <div className="backdrop"></div>}
      <UserDetails />
    </>
  );
};

export default NavBar;
