import "./UserDetails.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { useDropzone } from "react-dropzone";
import { Prompt } from "react-router-dom/cjs/react-router-dom.min";
import "react-datepicker/dist/react-datepicker.css";

const UserDetails = () => {
  //useState for saving the form data
  const [formData, setFormData] = useState({
    name: "",
    mobileNum: "",
    emailAddress: "",
    gender: "",
    bio: "",
    SocialMedia: {
      ig: "",
      fb: "",
    },
    profilePic: null,
    dob: "",
  });
  // list of all genders
  const genderOptions = ["Male", "Female", "Non-binary", "Other"];

  // saving clicks on inputs
  const handleGenderChange = (event) => {
    setFormData((prev) => {
      return { ...prev, gender: event.target.value };
    });
  };

  const detailsNameHan = (event) => {
    setFormData((prev) => {
      return { ...prev, name: event.target.value };
    });
  };
  const detailsMobHan = (event) => {
    setFormData((prev) => {
      return { ...prev, mobileNum: event.target.value };
    });
  };
  const detailsEmailHan = (event) => {
    setFormData((prev) => {
      return { ...prev, emailAddress: event.target.value };
    });
  };
  const detailsBioHan = (event) => {
    setFormData((prev) => {
      return { ...prev, bio: event.target.value };
    });
  };
  const handleDateChange = (date) => {
    setFormData((prev) => {
      return { ...prev, dob: date };
    });
  };

  const detailsPicHan = (accept) => {
    setFormData((prev) => {
      return { ...prev, profilePic: accept };
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: detailsPicHan,
    accept: "image/*", // Specify accepted file types (in this case, images)
  });

  // actions to be performed when the user details form is usbmitted
  const detailsFormHandler = () => {
    (async () => {
      const formData1 = new FormData();
      formData1.append("name", formData.name);
      formData1.append("mobileNum", formData.mobileNum);
      formData1.append("emailAddress", formData.emailAddress);
      formData1.append("gender", formData.gender);
      formData1.append("bio", formData.bio);
      formData1.append("profilePic", formData.profilePic);
      formData1.append("ig", formData.SocialMedia.ig);
      formData1.append("fb", formData.SocialMedia.fb);
      formData1.append("dob", formData.dob);
      try {
        const req = await fetch("http://localhost:3000/users/userdetails", {
          method: "POST",
          body: formData1,
        });
        const res = await req.json();
      } catch (e) {
      } finally {
      }
    })();
  };

  // perform the details functionalities when button is clicked
  const submitDetailsHan = () => {
    detailsFormHandler();
  };

  return (
    <>
      <Prompt when={true} message={() => "Please Complete the registration!"} />
      <div className="userdeatils_cont">
        <h1>Please enter your details</h1>
        <form className="userdetails_cont__form" onSubmit={detailsFormHandler}>
          <section className="userdetails_cont__pairs">
            <input
              placeholder="Enter name*"
              type="text"
              required
              onChange={detailsNameHan}
              value={formData.name}
            />

            <input
              placeholder="Enter Mobile Number*"
              type="tel"
              required
              onChange={detailsMobHan}
              value={formData.mobileNum}
            />
          </section>
          <section className="userdetails_cont__pairs">
            <input
              placeholder="Enter Email Address*"
              type="email"
              required
              value={formData.emailAddress}
              onChange={detailsEmailHan}
            />
            <input
              placeholder="Enter Bio"
              type="text"
              required
              value={formData.bio}
              onChange={detailsBioHan}
            />
          </section>
          <section className="userdetails_cont__pairs">
            <input placeholder="Instagram link" />
            <input placeholder="Facebook link" />
          </section>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleGenderChange}
          >
            <option value="">Select gender*</option>
            {genderOptions.map((gender, index) => (
              <option key={index} value={gender}>
                {gender}
              </option>
            ))}
          </select>
          <DatePicker
            selected={formData.dob}
            onChange={handleDateChange}
            dateFormat="MM/dd/yyyy"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15}
            placeholderText="Select a date of birth*"
            // isClearable // Adds a clear button
            style={{ witdh: "100%", textAlign: "center" }}
          />
          <div {...getRootProps()} className="userdetails_cont_imgdrop">
            <input {...getInputProps()} />
            {formData.profilePic
              ? formData.profilePic[0].path
              : "Browse or drop image"}
          </div>
        </form>
        <button onClick={submitDetailsHan} className="userdetails_btn">
          Submit details
        </button>
      </div>
    </>
  );
};

export default UserDetails;
