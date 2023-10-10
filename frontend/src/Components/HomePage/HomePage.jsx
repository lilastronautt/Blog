import { useState, useEffect } from "react";

import Loader from "../../lib/Loader/Loader";
import CreatePost from "../../lib/CreatePost/CreatePost";
import HomePageList from "../../lib/HomePageList/HomePageList";

import "./HomePage.css";

const HomePage = () => {
  // saving the blog details after it is fetched from the db
  const [blogData, setBlogData] = useState([]);

  //for showing loader till the time the async func runs
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let username = "ut@gmail.com";
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/blog/getuserallblogsdetails/${username}`
        );
        const jsonData = await res.json();
        setBlogData(() => jsonData);
        setShowLoader(false);
      } catch (e) {
      } finally {
      }
    })(); //IIFE for getting all the blog details
  }, []);

  return (
    <>
      <div className="homepage_cont">
        <CreatePost width={50} />
        {showLoader && <Loader dimension={4} />}
        {showLoader ||
          blogData?.map((el, index) => {
            // converting the buffer data to base64
            const binaryData = new Uint8Array(el.img.data);
            let base64Data = "";
            for (let i = 0; i < binaryData.length; i++) {
              base64Data += String.fromCharCode(binaryData[i]);
            }
            base64Data = btoa(base64Data);

            return (
              <div key={index}>
                <HomePageList
                  title={el.title}
                  textCont={el.textCont}
                  img={`data:image/png;base64,${base64Data}`}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
