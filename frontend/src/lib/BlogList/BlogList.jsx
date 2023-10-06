import "./BlogList.css";
import DOMPurify from "dompurify";
import Loader from "../Loader/Loader";

const BlogList = ({ title, textCont, imgUrl, className }) => {
  const sanitizedHTML = DOMPurify.sanitize(textCont);

  return (
    <>
      <div className={className}>
        <div className="profileblog_cont">
          <div>
            <h3>{title}</h3>
            <p
              dangerouslySetInnerHTML={{
                __html:
                  sanitizedHTML.slice(0, sanitizedHTML?.length / 2) + "...",
              }}
            ></p>
          </div>
          <div>
            <img src={imgUrl} />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogList;
