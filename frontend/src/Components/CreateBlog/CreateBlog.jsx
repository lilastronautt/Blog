import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Prompt, useHistory } from "react-router-dom";

import ReactQuill, { modules } from "react-quill";
import "react-quill/dist/quill.snow.css";

import Success from "../../lib/SuccessfullMessage/Sucessfull";

import "./CreateBlog.css";

const CreateBlog = () => {
  // useState for saving the create blog details
  const [BlogD, setBlogD] = useState({ title: "", img: null, textCont: "" });
  const [cbhFormState, setSBHFormState] = useState(false);
  const [showSucMsg, setShowSucMsg] = useState(false);
  const [showErrorMsg, setShowrrorMsg] = useState(false);
  const [btnMsg, setBtnMsg] = useState("POST");

  const history = useHistory();

  // sav the clicks on every input
  const onChangeTitle = (event) => {
    setBlogD((prev) => {
      return { ...prev, title: event.target.value };
    });
  };

  const blogImageHandler = useCallback((event) => {
    setBlogD((prev) => {
      return { ...prev, img: event[0] };
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: blogImageHandler,
    accept: "image/*", // Specify accepted file types (in this case, images)
  });

  // async func for taking inputs on every click on react-quill editor
  const onChangeEditorCon = async (value) => {
    let body = "";
    const value1 = await value;
    body = value1;
    setBlogD((prev) => {
      return { ...prev, textCont: body };
    });
  };

  //  actions to be performed when the user is finished typing
  const saveBlogDetailsBtn = (event) => {
    setBtnMsg(() => "POSTING...");
    event.preventDefault();
    setSBHFormState(() => false);
    if (!BlogD.img || !BlogD.textCont || !BlogD.title) {
      // if anyone of the field is empty prevent from submitting
      setBtnMsg(() => "POST");
      setShowrrorMsg(() => true);
      return;
    }
    const formData = new FormData();
    formData.append("title", BlogD.title);
    formData.append("img", BlogD.img);
    formData.append("textCont", BlogD.textCont);
    try {
      setShowrrorMsg(() => false);
      (async () => {
        const jsonData = await fetch("http://localhost:3000/blog/blogdetails", {
          method: "POST",
          body: formData,
        });
        const res = await jsonData.json();
        setBtnMsg(() => "POST");
        if (res.msg == "okay") {
          setShowSucMsg(() => true);
          setTimeout(() => {
            setShowSucMsg(() => false);
          }, 1500);
          setTimeout(() => {
            history.replace("/myprofile");
          }, 2000);
        } else {
          setShowrrorMsg(() => true);
        }
      })();
    } catch (e) {
      setShowrrorMsg(() => true);
    } finally {
    }
  };

  const cbfHandler = () => {
    setSBHFormState(() => true);
  };

  return (
    <>
      <Prompt
        when={cbhFormState}
        message={() =>
          "Dou wanna navigate to other to page? \nAll your input data will be lost!"
        }
      />
      <form className="createblog_main" onFocus={cbfHandler}>
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
          {showErrorMsg && (
            <div className="login_cont__error">
              Something went wrong,check whether all fields are filled!
            </div>
          )}
          <button className="createBlog_cont__btn" onClick={saveBlogDetailsBtn}>
            {btnMsg}
          </button>
        </section>
      </form>
      {showSucMsg && <Success />}
    </>
  );
};

export default CreateBlog;
