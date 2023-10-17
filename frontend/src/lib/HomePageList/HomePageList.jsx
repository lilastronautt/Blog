import DOMPurify from "dompurify";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import "./HomePageList.css";

import uparrow from "../../../src/assets/upA.svg";
import downarrow from "../../../src/assets/downA.svg";

const HomePageList = ({
  blogId,
  title,
  textCont,
  img,
  index,
  upvotes,
  downvotes,
}) => {
  const sanitizedHTML = DOMPurify.sanitize(textCont);
  const history = useHistory();
  const [upvotes1, setUpvotes] = useState(upvotes);
  const [downvotes1, setDownvotes] = useState(downvotes);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sliceLength, setSliceLength] = useState(0);

  const openBlogHandler = () => {
    history.push(`/blogdetail/${blogId}`);
  };

  const upvotesHandler = () => {
    (async () => {
      const req = await fetch(`http://localhost:3000/blog/upvote/${blogId}`, {
        method: "POST",
      });
      const res = await req.json();
      console.log(res[0].upvotes);
      setUpvotes(res[0].upvotes);
    })();
  };

  const downvotesHandler = () => {
    (async () => {
      const req = await fetch(`http://localhost:3000/blog/downvote/${blogId}`, {
        method: "POST",
      });
      const res = await req.json();
      console.log(res[0].downvotes);
      setDownvotes(res[0].downvotes);
    })();
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    if (windowWidth < 482) {
      setSliceLength(() =>
        sanitizedHTML.length > 80
          ? sanitizedHTML.length / 15
          : sanitizedHTML.length / 2
      );
    } else {
      setSliceLength(() =>
        sanitizedHTML.length / 2 > 200
          ? sanitizedHTML.length / 5
          : sanitizedHTML.length / 2
      );
    }
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowWidth]);

  return (
    <>
      <div className="hpl_cont">
        <div className="hpl_action__cont">
          <div className="hpl_action__imgcont" onClick={upvotesHandler}>
            <SvgLoader path={uparrow}>
              <SvgProxy selector="#Star" />
            </SvgLoader>
          </div>
          <div>{upvotes1}</div>
          <div>{downvotes1}</div>
          <div
            className="hpl_action__imgcont hpl_down__svg"
            onClick={downvotesHandler}
          >
            <SvgLoader path={downarrow}>
              <SvgProxy selector="#Star" />
            </SvgLoader>
          </div>
        </div>
        <div onClick={openBlogHandler}>
          <h2>{title}</h2>
          <div className="hpl_img__cont">
            <img src={img} />
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: sanitizedHTML.slice(0, sliceLength) + "...",
            }}
          ></p>
          <div className="hpl_msg">Click to see more</div>
        </div>
      </div>
    </>
  );
};

export default HomePageList;
