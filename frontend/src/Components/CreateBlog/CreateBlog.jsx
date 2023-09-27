import "./CreateBlog.css";
import ReactQuill, { modules } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

const CreateBlog = () => {
  const [BlogD, setBlogD] = useState({ title: "", img: null, textCont: "" });

  const onChangeTitle = (event) => {
    setBlogD((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  const blogImageHandler = (event) => {
    setBlogD((prev) => {
      return { ...prev, img: event.target.files[0] };
    });
  };

  const onChangeEditorCon = async (value) => {
    let body = "";
    const value1 = await value;
    body = value1;
    setBlogD((prev) => {
      return { ...prev, textCont: body };
    });
  };

  const saveBlogDetailsBtn = () => {
    const formData = new FormData();
    formData.append("title", BlogD.title);
    formData.append("img", BlogD.img);
    formData.append("textCont", BlogD.textCont);
    try {
      (async () => {
        const jsonData = await fetch("http://localhost:3000/blog/blogdetails", {
          method: "POST",
          body: formData,
        });
        const res = await jsonData.json();
        console.log(res);
      })();
    } catch (e) {
    } finally {
    }
  };

  return (
    <section className="createBlog_cont">
      <div className="createBlog_cont__inputs">
        <label>Title</label>
        <input
          type="text"
          onChange={onChangeTitle}
          value={BlogD.title}
          required
          placeholder="My blog..."
        />
      </div>
      <div className="createBlog_cont__inputs">
        <label>Header Image</label>
        <input
          type="file"
          name="profilePic"
          accept="image/*"
          required
          onChange={blogImageHandler}
        />
      </div>
      <ReactQuill
        theme="snow"
        onChange={onChangeEditorCon}
        modules={modules}
        placeholder="Start Writing Anything you want..."
      ></ReactQuill>
      <button className="createBlog_cont__btn" onClick={saveBlogDetailsBtn}>
        Post
      </button>
    </section>
  );
};

export default CreateBlog;
