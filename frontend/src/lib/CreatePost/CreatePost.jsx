import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import nodp from "../../assets/nodp.jpg";
import "./CreatePost.css";

const CreatePost = ({ width, margin }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const history = useHistory();
  const username = useSelector((state) => state.username);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    isLoggedIn &&
      (async () => {
        try {
          const jsonData = await fetch(
            `http://localhost:3000/users/getuserdetails/${username}`
          );
          const res = await jsonData.json();
          if (!res.length) return;
          console.log(res);
          const binaryData = new Uint8Array(res.profilepic.data);
          let base64Data = "";
          for (let i = 0; i < binaryData.length; i++) {
            base64Data += String.fromCharCode(binaryData[i]);
          }
          base64Data = btoa(base64Data);
          setImgUrl(`data:image/png;base64,${base64Data}`);
        } catch (e) {
          console.log(e);
        }
      })();
  }, []);

  const createPostOpenHandler = () => {
    history.push("/createblog");
  };

  const userProfileOpenHandler = () => {
    history.push(`/userprofile/${username}/allblogs`);
  };

  return (
    <section
      className="createPost"
      style={{ width: `${width}%`, marginTop: `${margin}rem` }}
    >
      <div className="createPost__img" onClick={userProfileOpenHandler}>
        <img src={imgUrl || nodp} />
      </div>
      <input
        placeholder="Create post"
        className="routerLink"
        onClick={createPostOpenHandler}
      />
    </section>
  );
};

export default CreatePost;
