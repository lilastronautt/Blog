import "./BlogList.css";
import DOMPurify from "dompurify";
import { useHistory } from "react-router-dom";

const BlogList = ({ blogId, title, textCont, imgUrl, className }) => {
  const sanitizedHTML = DOMPurify.sanitize(textCont);
  const history = useHistory();

  const openBlogHandler = () => {
    history.push(`/blogdetail/${blogId}`);
  };
  return (
    <>
      <div className={className} onClick={openBlogHandler}>
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
