import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Loader from "../Loader/Loader";

import "./SideProfile.css";

const SideProfile = () => {
  //for saving the data after it is fetched from the database
  const [data, setData] = useState({});

  // the img data after it is converted into base64 coz it is stored in buffer at db
  const [imgUrl, setImgUrl] = useState(null);

  // formatted date
  const [formattedDate, setFormattedDate] = useState(null);

  //for showing loader till the time the async func runs
  const [showLoader, setShowLoader] = useState(true);
  const username = localStorage.getItem("username");
  const params = useParams();
  const usernamR = params.username || username;
  useEffect(() => {
    username &&
      (async () => {
        const jsonData = await fetch(
          `http://localhost:3000/users/getuserdetails/${usernamR}`
        );
        const res = await jsonData.json();
        setData(() => res);
        // converting the data to base64
        const binaryData = new Uint8Array(res?.profilepic?.data);
        let base64Data = "";
        for (let i = 0; i < binaryData.length; i++) {
          base64Data += String.fromCharCode(binaryData[i]);
        }
        base64Data = btoa(base64Data);
        setImgUrl(`data:image/png;base64,${base64Data}`);

        //formatting the date
        const inputDate = new Date(res.dob);
        const options = { year: "numeric", month: "long", day: "numeric" };
        setFormattedDate(inputDate.toLocaleDateString("en-US", options));

        setShowLoader(() => false);
      })(); // IIFE for geetin the username data from the db
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
              <h3>{data?.fullname}</h3>
              <h5>{data?.username}</h5>
              <label>About</label>
              <h3>{data?.bio}</h3>
              <label>Date of birth</label>
              <h4>{formattedDate}</h4>
              <label>Email address</label>
              <h4>{data?.email_address}</h4>
              <label>Mobile Number</label>
              <h4>{data?.mobile_number}</h4>
            </>
          )}
        </aside>
      </div>
    </>
  );
};

export default SideProfile;
