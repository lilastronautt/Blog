import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CreatePost.css";

const CreatePost = ({ width, margin }) => {
  const [imgUrl, setImgUrl] = useState(null);
  useEffect(() => {
    (async () => {
      let username = "lilastronautt";
      const jsonData = await fetch(
        `http://localhost:3000/users/getuserdetails/${username}`
      );
      const res = await jsonData.json();
      const binaryData = new Uint8Array(res.profilepic.data);
      let base64Data = "";
      for (let i = 0; i < binaryData.length; i++) {
        base64Data += String.fromCharCode(binaryData[i]);
      }
      base64Data = btoa(base64Data);
      setImgUrl(`data:image/png;base64,${base64Data}`);
    })();
  }, []);

  return (
    <Link to="/createblog">
      <section
        className="createPost"
        style={{ width: `${width}%`, marginTop: `${margin}rem` }}
      >
        <div className="createPost__img">
          <img src={imgUrl} />
        </div>
        <input placeholder="Create post" className="routerLink" />
      </section>
    </Link>
  );
};

export default CreatePost;
