import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { blogActions } from "../../../store/store";
import Cookies from "js-cookie";
import "./Logout.css";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    Cookies.remove("username");
    dispatch(blogActions.setUsername("user"));
    dispatch(blogActions.setLoginState(false));
  }, []);
  return <></>;
};

export default Logout;
