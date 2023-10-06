import "../login/Login.css";
import cancel from "../../../assets/cancel.png";
import { blogActions } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../../../lib/Loader/Loader";

const Register = () => {
  const [btnMsg, setBtnMsg] = useState("Register");
  const [errorMsg, setErrorMsg] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const usernameExists = useSelector((state) => state.usernameExists);
  const passNotEqual = useSelector((state) => state.passNotEqual);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const usernameHandler = (event) => {
    setFormData((prev) => {
      return { ...prev, username: event.target.value };
    });
  };

  useEffect(() => {
    setErrorMsg(() => false);
    dispatch(blogActions.usernameExists(false));
    dispatch(blogActions.setPassNotEqual(false));
    setShowLoader(() => true);
    //logic for checking if username exists or not
    let timer = setTimeout(async () => {
      try {
        const usernamesRes = await fetch(
          "http://localhost:3000/users/usernames"
        );
        const data = await usernamesRes.json();

        data.forEach((el) => {
          if (el.username == formData.username) {
            dispatch(blogActions.usernameExists(true));
          }
        });
        setShowLoader(() => false);
      } catch (e) {}
    }, 800);

    return () => {
      clearTimeout(timer);
    };
  }, [formData]);

  const passwordHandler = (event) => {
    setFormData((prev) => {
      return { ...prev, password: event.target.value };
    });
  };

  const confirmPasswordHandler = (event) => {
    setFormData((prev) => {
      return { ...prev, confirmPassword: event.target.value };
    });
  };

  const loginFormHandler = (e) => {
    dispatch(blogActions.setPassNotEqual(false));
    e.preventDefault();
    if (usernameExists) {
      return;
    }
    if (formData.password != formData.confirmPassword) {
      dispatch(blogActions.setPassNotEqual(true));
    } else {
      const jsonRes = async () => {
        try {
          setBtnMsg(() => "Registering...");
          const req = await fetch("http://localhost:3000/users/register", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const res = await req.json();
          console.log(res.msg);
          if (res.msg == "error") {
            setErrorMsg(() => true);
          }
        } catch (e) {
          setErrorMsg(() => true);
        } finally {
          setBtnMsg(() => "Register");
        }
      };
      jsonRes();
    }
  };

  const closeUserActionHandler = () => {
    dispatch(blogActions.closeAuth());
  };

  const showLog = () => {
    dispatch(blogActions.showLoginModal(true));
    dispatch(blogActions.showRegistrationModal(false));
  };

  return (
    <section className="login_cont">
      <div className="login_cont__icon" onClick={closeUserActionHandler}>
        <img src={cancel} alt="cancel" />
      </div>
      <div className="login_cont__msg">Welcome!</div>
      <form onSubmit={loginFormHandler} className="login_cont__form">
        <section>
          <input
            type="text"
            placeholder="Enter Username"
            onChange={usernameHandler}
            value={formData.username}
            required
          />
          {usernameExists && (
            <div className="login_cont__error">username already exists</div>
          )}
          {showLoader && <Loader dimension={1.5} />}
        </section>

        <section>
          {/* <label>Enter Password</label> */}
          <input
            type="password"
            placeholder="Enter Password"
            onChange={passwordHandler}
            value={formData.password}
            required
          />
        </section>
        <section>
          {/* <label>Enter Password</label> */}
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={confirmPasswordHandler}
            value={formData.confirmPassword}
            required
          />
        </section>
        {passNotEqual && (
          <div className="login_cont__error">Passwords do not match.</div>
        )}

        {errorMsg && (
          <div className="login_cont__error">Something went wrong.</div>
        )}
        <button type="submit" className="login_cont_formButton">
          {btnMsg}
        </button>
      </form>
      <div className="login_cont__otherOp" onClick={showLog}>
        Already have a account? Login instead
      </div>
    </section>
  );
};

export default Register;
