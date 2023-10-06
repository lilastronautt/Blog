import { useEffect, useState } from "react";
import Profile from "../../lib/Profile/Profile";
import BlogList from "../../lib/BlogList/BlogList";
import Loader from "../../lib/Loader/Loader";
import CreatePost from "../../lib/CreatePost/CreatePost";
import "./MyProfile.css";

const MyProfile = () => {
  const [blogData, setBlogData] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let username = "ut@gmail.com";
    (async () => {
      const res = await fetch(
        `http://localhost:3000/blog/getuserallblogsdetails/${username}`
      );
      const jsonData = await res.json();
      setBlogData(() => jsonData);
      setShowLoader(() => false);
      console.log(jsonData);
    })();
  }, []);
  return (
    <>
      <Profile username={"ut@gmail.com"} />
      <section className="blog_hdngbtn">
        <div>
          <h2>All blogs</h2>
          <CreatePost width={100} />
        </div>
      </section>
      {showLoader && <Loader dimension={3} />}
      {showLoader ||
        blogData.map((el) => {
          const binaryData = new Uint8Array(el.img.data);
          let base64Data = "";
          for (let i = 0; i < binaryData.length; i++) {
            base64Data += String.fromCharCode(binaryData[i]);
          }
          base64Data = btoa(base64Data);
          return (
            <BlogList
              imgUrl={`data:image/png;base64,${base64Data}`}
              title={el.title}
              textCont={el.textCont}
              className="bloglist"
            />
          );
        })}
    </>
  );
};

export default MyProfile;
