import DOMPurify from "dompurify";
import "./HomePageList.css";
import uparrow from "../../../src/assets/uparrow.png";
import downarrow from "../../../src/assets/downarrow.png";

const HomePageList = ({ title, textCont, img }) => {
  const sanitizedHTML = DOMPurify.sanitize(textCont);

  return (
    <>
      <div className="hpl_cont">
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
            <img src={uparrow} />
          </div>
          <div>12</div>
          <div className="hpl_action__imgcont">
            <img src={downarrow} />
          </div>
        </div>
        <div className="hpl_msg">Click to see more</div>
      </div>
    </>
  );
};

export default HomePageList;