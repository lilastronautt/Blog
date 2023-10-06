import DOMPurify from "dompurify";
import { SvgLoader, SvgProxy } from "react-svgmt";

import "./HomePageList.css";

import uparrow from "../../../src/assets/upA.svg";
import downarrow from "../../../src/assets/downA.svg";

const HomePageList = ({ title, textCont, img, index }) => {
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
            <SvgLoader path={uparrow} selector=" ">
              <SvgProxy />
            </SvgLoader>
          </div>
          <div>12</div>
          <div className="hpl_action__imgcont hpl_down__svg">
            <SvgLoader path={downarrow} selector=" ">
              <SvgProxy />
            </SvgLoader>
          </div>
        </div>
        <div className="hpl_msg">Click to see more</div>
      </div>
    </>
  );
};

export default HomePageList;
