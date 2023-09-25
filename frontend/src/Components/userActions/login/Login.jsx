import "./Login.css";

import cancel from "../../../assets/cancel.png";
import { blogActions } from "../../../store/store";
import { useDispatch } from "react-redux";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const passHandler = (event) => {
    setFormData((prev) => {
      return { ...prev, password: event.target.value };
    });
  };
  const usernameHandler = (event) => {
    setFormData((prev) => {
      return { ...prev, username: event.target.value };
    });
  };

  const dispatch = useDispatch();

  const loginFormHandler = (e) => {
    e.preventDefault();

    const fetchfunc = async () => {
      try {
        const jsonRes = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const res = await jsonRes.json();
        console.log(res);
      } catch (e) {
        console.log(e);
      } finally {
      }
    };
    fetchfunc();
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
        <form onSubmit={loginFormHandler} className="login_cont__form">
          <section>
            {/* <label>Enter Username</label> */}
            <input
              type="text"
              placeholder="Enter Username"
              onChange={usernameHandler}
              value={formData.username}
            />
          </section>

          <section>
            {/* <label>Enter Password</label> */}
            <input
              type="password"
              placeholder="Enter Password"
              onChange={passHandler}
              value={formData.password}
            />
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
