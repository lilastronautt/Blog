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

  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let username = "lilastronautt";
    (async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/blog/getuserallblogsdetails/${username}`
        );
        const jsonData = await res.json();
        setBlogData(() => jsonData);
        setShowLoader(false);
        if (jsonData.msg == "error") {
          setShowErrorMsg(() => true);
          setErrorMsg(() => "something went wrong!");
          return;
        }
        if (!jsonData[0]) {
          setShowErrorMsg(() => true);
          setErrorMsg(
            () =>
              "Uhoh,looks like this site dosent have any blog, WHAT , go create one??:)"
          );
        }
      } catch (e) {
        setShowErrorMsg(() => true);
        setErrorMsg(() => "something went wrong");
      }
    })(); //IIFE for getting all the blog details
  }, []);

  return (
    <>
      <div className="homepage_cont">
        <CreatePost width={50} />
        {showErrorMsg && <div className="homepage_errormsg">{errorMsg}</div>}
        {showLoader && <Loader dimension={4} />}
        {showLoader ||
          blogData?.map((el, index) => {
            // converting the buffer data to base64
            const binaryData = new Uint8Array(el.image.data);
            let base64Data = "";
            for (let i = 0; i < binaryData.length; i++) {
              base64Data += String.fromCharCode(binaryData[i]);
            }
            base64Data = btoa(base64Data);

            return (
              <div key={index}>
                <HomePageList
                  title={el.title}
                  textCont={el.content}
                  img={`data:image/png;base64,${base64Data}`}
                  upvotes={el.upvotes}
                  downvotes={el.downvotes}
                  blogId={el.blogId}
                />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default HomePage;
