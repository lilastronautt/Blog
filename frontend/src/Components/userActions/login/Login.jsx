import { useDispatch } from "react-redux";
import { useState } from "react";

import { blogActions } from "../../../store/store";

import cancel from "../../../assets/cancel.png";

import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();

  //useState for handling form data
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  //save the clicks on username input
  const loginUsernameHandler = (event) => {
    setLoginFormData((prev) => {
      return { ...prev, username: event.target.value };
    });
  };

  //save the clicks on password input
  const loginPassHandler = (event) => {
    setLoginFormData((prev) => {
      return { ...prev, password: event.target.value };
    });
  };

  //actions to be formed when login form is submitted
  const loginFormHandler = (e) => {
    e.preventDefault(); // to prevent it from reloading the page

    (async () => {
      try {
        const jsonRes = await fetch("http://localhost:3000/users/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginFormData),
        });
        const res = await jsonRes.json();
      } catch (e) {
      } finally {
      }
    })(); // IIFE for checking if the user exist and authenticate then
  };

  // close the login page (temp)
  const closeUserActionHandler = () => {
    dispatch(blogActions.closeAuth());
  };

  // open the registration page (temp)
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
            <input
              type="text"
              placeholder="Enter Username"
              onChange={loginUsernameHandler}
              value={loginFormData.username}
            />
          </section>

          <section>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={loginPassHandler}
              value={loginFormData.password}
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
