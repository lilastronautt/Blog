import "./BlogList.css";
import DOMPurify from "dompurify";
import Loader from "../Loader/Loader";
import { useState } from "react";

const BlogList = ({ title, textCont, imgUrl, className }) => {
  const sanitizedHTML = DOMPurify.sanitize(textCont);

  return textCont ? (
    <div className={className}>
      <div className="profileblog_cont">
        <div>
          <h3>{title}</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: sanitizedHTML.slice(0, sanitizedHTML?.length / 2) + "...",
            }}
          ></p>
        </div>
        <div>
          <img src={imgUrl} />
        </div>
      </div>
    </div>
  ) : (
    <Loader dimension={5} />
  );
};

export default BlogList;
