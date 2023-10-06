import "./Profile.css";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";

const Profile = ({ username }) => {
  const [data, setData] = useState({});
  const [imgUrl, setImgUrl] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [showLoader, setShowLoader] = useState(true);
  useEffect(() => {
    (async () => {
      const jsonData = await fetch(
        `http://localhost:3000/users/getuserdetails/${username}`
      );
      const res = await jsonData.json();
      console.log(res);
      setData(() => res);
      const binaryData = new Uint8Array(res.profilePic.data);
      let base64Data = "";
      for (let i = 0; i < binaryData.length; i++) {
        base64Data += String.fromCharCode(binaryData[i]);
      }
      base64Data = btoa(base64Data);
      setImgUrl(`data:image/png;base64,${base64Data}`);
      const inputDate = new Date(res.dob);
      const options = { year: "numeric", month: "long", day: "numeric" };
      setFormattedDate(inputDate.toLocaleDateString("en-US", options));
      setShowLoader(() => false);
      console.log(data);
    })();
  }, []);

  return (
    <>
      <div className="profile_cont">
        <aside className="profile_cont___basics">
          {showLoader && <Loader dimension={2} />}

          {showLoader || (
            <>
              <div className="profile_cont__basicsImg">
                <img src={imgUrl} alt="profile pic" />
              </div>
              <h3>{data.fullName}</h3>
              <h5>{data.username}</h5>
              <label>About</label>
              <h3>{data.bio}</h3>
              <label>Date of birth</label>
              <h4>{formattedDate}</h4>
              <label>Email address</label>
              <h4>{data.emailAddress}</h4>
              <label>Mobile Number</label>
              <h4>{data.mobileNum}</h4>
            </>
          )}
        </aside>
      </div>
    </>
  );
};

export default Profile;
