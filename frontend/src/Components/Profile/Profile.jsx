import "./Profile.css";
import { useEffect, useState } from "react";

const Profile = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    let username = "ut@gmail.com";
    (async () => {
      const jsonData = await fetch(
        `http://localhost:3000/users/getuserdetails/${username}`,
        {
          method: "POST",
        }
      );
      const res = await jsonData.json();
      console.log(res);
    })();
  }, []);

  return <div> hello </div>;
};

export default Profile;
