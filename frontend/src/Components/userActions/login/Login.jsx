import "./Login.css";

import cancel from "../../../assets/cancel.png";
import { blogActions } from "../../../store/store";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();

  const loginFormHanndler = (e) => {
    e.preventDefault();
  };
  const closeUserActionHandler = () => {
    dispatch(blogActions.closeAuth());
  };

  const showRegHandler = () => {
    dispatch(blogActions.showLoginModal(false));
    dispatch(blogActions.showRegistrationModal(true));
  };

  return (
    <>
      <section className="login_cont">
        <div className="login_cont__icon" onClick={closeUserActionHandler}>
          <img src={cancel} alt="cancel" />
        </div>
        <div className="login_cont__msg">Welcome back!</div>
        <form onSubmit={loginFormHanndler} className="login_cont__form">
          <section>
            {/* <label>Enter Username</label> */}
            <input type="text" placeholder="Enter Username" />
          </section>

          <section>
            {/* <label>Enter Password</label> */}
            <input type="password" placeholder="Enter Password" />
          </section>
          <button type="submit" className="login_cont_formButton">
            Login
          </button>
        </form>
        <div className="login_cont__otherOp" onClick={showRegHandler}>
          No account? Create one
        </div>
      </section>
    </>
  );
};

export default Login;
