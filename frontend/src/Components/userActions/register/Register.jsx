import "../login/Login.css";
import Login from "../login/Login";
import cancel from "../../../assets/cancel.png";
import { useState } from "react";

const Register = ({ close }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const usernameHandler = (event) => {
    setFormData((prev) => {
      return { ...prev, username: event.target.value };
    });
  };

  const passwordHandler = (event) => {
    setFormData((prev) => {
      return { ...prev, password: event.target.value };
    });
  };
  const loginFormHanndler = (e) => {
    e.preventDefault();
    console.log("this ran");
    //mylogic for unique username everytime
    const jsonRes = async () => {
      const req = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const res = await req.json();
      console.log(res);
    };
    jsonRes();
  };
  const closeUserActionHandler = () => {
    close();
  };

  return (
    <section className="login_cont">
      <div className="login_cont__icon" onClick={closeUserActionHandler}>
        <img src={cancel} alt="cancel" />
      </div>
      <div className="login_cont__msg">Welcome!</div>
      <form onSubmit={loginFormHanndler} className="login_cont__form">
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
            onChange={passwordHandler}
            value={formData.password}
          />
        </section>
        <section>
          {/* <label>Enter Password</label> */}
          <input type="password" placeholder="Confirm Password" />
        </section>
        <button type="submit" className="login_cont_formButton">
          Register
        </button>
      </form>
      <div className="login_cont__otherOp">
        Already have a account? <a href={<Login />}>Login instead</a>
      </div>
    </section>
  );
};

export default Register;
