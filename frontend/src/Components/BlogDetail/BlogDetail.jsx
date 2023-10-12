import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loader from "../../lib/Loader/Loader";
import DOMPurify from "dompurify";
import "./BlogDetail.css";

const BlogDetail = () => {
  const [blogData, setBlogData] = useState({});
  const [imgData, setImgData] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const params = useParams();
  const sanitizedHTML = DOMPurify.sanitize(blogData.content);
  useEffect(() => {
    (async () => {
      const req = await fetch(
        `http://localhost:3000/blog/getblogdetails/${params.blogId}`
      );
      const res = await req.json();
      setBlogData(() => res[0]);
      const binaryData = new Uint8Array(res[0].image.data);
      let base64Data = "";
      for (let i = 0; i < binaryData.length; i++) {
        base64Data += String.fromCharCode(binaryData[i]);
      }
      base64Data = btoa(base64Data);
      setImgData(`data:image/png;base64,${base64Data}`);
      setShowLoader(() => false);
    })();
  }, []);

  return (
    <section className="blogdetail_cont">
      {showLoader && <Loader dimension={4} />}
      {showLoader || (
        <div>
          <h1>{blogData.title}</h1>
          <div className="blogdetail_img__cont">
            <img src={imgData} />
          </div>
          <p
            dangerouslySetInnerHTML={{
              __html: sanitizedHTML,
            }}
          ></p>
        </div>
      )}
    </section>
  );
};

export default BlogDetail;
