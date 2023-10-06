import { useState, useEffect } from "react";
import Loader from "../../lib/Loader/Loader";
import CreatePost from "../../lib/CreatePost/CreatePost";
import HomePageList from "../../lib/HomePageList/HomePageList";
import "./HomePage.css";

const HomePage = () => {
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
      setShowLoader(false);
    })();
  }, []);

  return (
    <>
      {showLoader && <Loader dimension={4} />}
      {showLoader || (
        <div className="homepage_cont">
          <CreatePost width={50} />
          {blogData?.map((el) => {
            const binaryData = new Uint8Array(el.img.data);
            let base64Data = "";
            for (let i = 0; i < binaryData.length; i++) {
              base64Data += String.fromCharCode(binaryData[i]);
            }
            base64Data = btoa(base64Data);

            return (
              <HomePageList
                title={el.title}
                textCont={el.textCont}
                img={`data:image/png;base64,${base64Data}`}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default HomePage;
