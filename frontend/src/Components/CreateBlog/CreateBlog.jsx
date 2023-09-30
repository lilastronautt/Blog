import "./CreateBlog.css";
import { useDropzone } from "react-dropzone";
import ReactQuill, { modules } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState, useCallback } from "react";

const CreateBlog = () => {
  const [BlogD, setBlogD] = useState({ title: "", img: null, textCont: "" });

  const onChangeTitle = (event) => {
    setBlogD((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  const blogImageHandler = (event) => {
    console.log(event[0]);
    setBlogD((prev) => {
      return { ...prev, img: event[0] };
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: blogImageHandler,
    accept: "image/*", // Specify accepted file types (in this case, images)
  });

  const onChangeEditorCon = async (value) => {
    let body = "";
    const value1 = await value;
    body = value1;
    setBlogD((prev) => {
      return { ...prev, textCont: body };
    });
  };

  const saveBlogDetailsBtn = () => {
    if (!BlogD.img || !BlogD.textCont || !BlogD.title) {
      return;
    }
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
    <div className="createblog_main">
      <h2> Create a post</h2>
      <section className="createBlog_cont">
        <h2>POST</h2>
        <div className="createBlog_cont__inputs">
          <input
            type="text"
            onChange={onChangeTitle}
            value={BlogD.title}
            required
            placeholder="Title"
          />
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {BlogD.img ? BlogD.img.path : "Browse or drop image"}
          </div>
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
    </div>
  );
};

export default CreateBlog;
