import "./NavBar.css";
import Login from "../userActions/login/Login";
import Register from "../userActions/register/Register";
import { useState } from "react";

const NavBar = () => {
  // this code is temperory here
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const onClickHandler = () => {
    setShowLogin((prev) => !prev);
    setShowRegister(() => false);
  };
  const closeHandler = () => {
    setShowLogin(() => false);
    setShowRegister(() => false);
  };
  const showRegHandler = () => {
    setShowLogin(() => false);
    setShowRegister((prev) => !prev);
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
      {showLogin && <Login close={closeHandler} showReg={showRegHandler} />}
      {showRegister && <Register close={closeHandler} />}
      {showLogin && <div className="backdrop"></div>} {/** temp backdrop */}
      {showRegister && <div className="backdrop"></div>} {/** temp backdrop */}
    </>
  );
};

export default NavBar;
