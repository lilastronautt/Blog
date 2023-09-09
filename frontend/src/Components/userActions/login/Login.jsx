import "./Login.css";
import Register from "../register/Register";
import cancel from "../../../assets/cancel.png";

const Login = ({ close, showReg }) => {
  const loginFormHanndler = (e) => {
    e.preventDefault();
  };
  const closeUserActionHandler = () => {
    close();
  };

  const showRegHandler = () => {
    showReg();
  };
  return (
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
  );
};

export default Login;
