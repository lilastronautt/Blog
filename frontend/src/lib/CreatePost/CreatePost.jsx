import { useEffect, useState } from "react";
import "./CreatePost.css";

const CreatePost = ({ width }) => {
  const [imgUrl, setImgUrl] = useState(null);
  useEffect(() => {
    (async () => {
      let username = "ut@gmail.com";
      const jsonData = await fetch(
        `http://localhost:3000/users/getuserdetails/${username}`
      );
      const res = await jsonData.json();
      const binaryData = new Uint8Array(res.profilePic.data);
      let base64Data = "";
      for (let i = 0; i < binaryData.length; i++) {
        base64Data += String.fromCharCode(binaryData[i]);
      }
      base64Data = btoa(base64Data);
      setImgUrl(`data:image/png;base64,${base64Data}`);
    })();
  }, []);

  return (
    <section className="createPost" style={{ width: `${width}%` }}>
      <div className="createPost__img">
        <img src={imgUrl} />
      </div>
      <input placeholder="Create post" />
    </section>
  );
};

export default CreatePost;
