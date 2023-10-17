import { NavLink } from "react-router-dom";

import SideProfile from "../../lib/SideProfile/SideProfile";
import CreatePost from "../../lib/CreatePost/CreatePost";

import "./UserProfile.css";

const MyProfile = () => {
  return (
    <>
      <SideProfile username="lilastronautt" />
      <section className="blog_hdngbtn">
        <div>
          <nav>
            <NavLink
              to="/userprofile/lilastronautt/allblogs"
              className="routerLink usernav"
              activeClassName="routerLink_active usernav_active"
            >
              All blogs
            </NavLink>

            <NavLink
              to="/userprofile/lilastronautt/upvotedblogs"
              className="routerLink usernav"
              activeClassName="routerLink_active usernav_active"
            >
              Upvoted blogs
            </NavLink>
          </nav>
          <CreatePost width={100} margin={2} />
        </div>
      </section>
    </>
  );
};

export default MyProfile;
