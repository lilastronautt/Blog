import DOMPurify from "dompurify";
import { SvgLoader, SvgProxy } from "react-svgmt";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
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
  const openBlogHandler = () => {
    history.push(`/blogdetail/${blogId}`);
  };

  return (
    <>
      <div className="hpl_cont" onClick={openBlogHandler}>
        <h2>{title}</h2>
        <div className="hpl_img__cont">
          <img src={img} />
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: sanitizedHTML.slice(0, sanitizedHTML?.length / 2) + "...",
          }}
        ></p>
        <div className="hpl_action__cont">
          <div className="hpl_action__imgcont">
            <SvgLoader path={uparrow}>
              <SvgProxy selector="#Star" />
            </SvgLoader>
          </div>
          <div>{upvotes}</div>
          <div>{downvotes}</div>
          <div className="hpl_action__imgcont hpl_down__svg">
            <SvgLoader path={downarrow}>
              <SvgProxy selector="#Star" />
            </SvgLoader>
          </div>
        </div>
        <div className="hpl_msg">Click to see more</div>
      </div>
    </>
  );
};

export default HomePageList;
