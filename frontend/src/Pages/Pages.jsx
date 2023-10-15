import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "../Components/NavBar/NavBar";
import Login from "../Components/userActions/login/Login";
import Register from "../Components/userActions/register/Register";
import UserDetails from "../Components/userActions/userDetails/UserDetails";
import HomePage from "../Components/HomePage/HomePage";
import CreateBlog from "../Components/CreateBlog/CreateBlog";
import UserProfile from "../Components/UserProfile/UserProfile";
import UpvotedBlogs from "../Components/UpvotedBlogs/UpvotedBlog";
import Backdrop from "../lib/Backdrop/Backdrop";
import NotFound from "../Components/NotFound/NotFound";
import BlogDetail from "../Components/BlogDetail/BlogDetail";
import AllBlogs from "../Components/AllBlogs/AllBlogs";

const Pages = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login" exact>
          <Backdrop />
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
          <Backdrop />
        </Route>
        <Route path="/register/userdetails" exact>
          <UserDetails />
          <Backdrop />
        </Route>
        <Route path="/createblog" exact>
          <CreateBlog />
        </Route>
        <Route path="/userprofile/:username/allblogs" exact>
          <UserProfile />
          <AllBlogs />
        </Route>
        <Route path="/userprofile/:username/upvotedblogs" exact>
          <UserProfile />
          <UpvotedBlogs />
        </Route>
        <Route path="/errorpage">
          <NotFound />
        </Route>
        <Route path="/blogdetail/:blogId">
          <BlogDetail />
        </Route>
        <Route path="*" exact>
          <Redirect to="/errorpage" />
        </Route>
      </Switch>
    </>
  );
};

export default Pages;
